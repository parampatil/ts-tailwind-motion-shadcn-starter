# Authentication System Documentation

This starter template includes a complete authentication system with role-based access control, Firebase integration, and Zustand state management.

## Features

- ✅ **Email/Password Authentication**
- ✅ **Google OAuth** (Firebase)
- ✅ **Role-Based Access Control** (Admin, Moderator, User)
- ✅ **Route Protection**
- ✅ **Persistent Authentication State** (Zustand)
- ✅ **Demo Mode** (works without Firebase setup)
- ✅ **Responsive UI Components**
- ✅ **Toast Notifications** (Sonner)

## Quick Start

### 1. Demo Mode (No Setup Required)

The authentication system works out of the box in demo mode. You can:

- Try login with any email/password combination
- Test Google OAuth (demo)
- See role-based access control in action

### 2. Firebase Setup (Production)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google
3. Copy `lib/firebase.template.ts` to `lib/firebase.ts`
4. Replace the config values with your Firebase project settings
5. Update `lib/auth.ts` to import auth from your firebase.ts file

## File Structure

```
lib/
├── auth.ts                 # Authentication functions
├── firebase.template.ts    # Firebase config template
└── store/
    └── authStore.ts       # Zustand auth store

components/
├── auth/
│   ├── AuthForm.tsx       # Login/Signup form
│   ├── AuthProvider.tsx   # Auth context provider
│   └── RouteGuard.tsx     # Route protection component
└── layout/
    └── UserDropdown.tsx   # User menu in navbar

app/
├── auth/
│   └── login/
│       └── page.tsx       # Login page
├── profile/
│   └── page.tsx          # User profile (protected)
├── admin/
│   └── page.tsx          # Admin dashboard (admin only)
└── unauthorized/
    └── page.tsx          # 403 page
```

## Usage Examples

### Protecting Routes

```tsx
// Protect any route
import RouteGuard from "@/components/auth/RouteGuard";

export default function ProtectedPage() {
  return (
    <RouteGuard>
      <div>This content requires authentication</div>
    </RouteGuard>
  );
}

// Admin-only route
export default function AdminPage() {
  return (
    <RouteGuard requiredRoles={["admin"]}>
      <div>Admin only content</div>
    </RouteGuard>
  );
}

// Multiple roles
export default function ModeratorPage() {
  return (
    <RouteGuard requiredRoles={["admin", "moderator"]}>
      <div>Admin or moderator content</div>
    </RouteGuard>
  );
}
```

### Using Auth Store

```tsx
import { useAuthStore } from "@/lib/store/authStore";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.displayName || user?.email}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Permission Checks

```tsx
import { usePermissions } from "@/components/auth/RouteGuard";

function AdminButton() {
  const { isAdmin, canAccess } = usePermissions();

  if (!canAccess(["admin"])) {
    return null;
  }

  return <button>Admin Action</button>;
}
```

## Authentication Functions

### Sign Up

```tsx
import { signUpWithEmail } from "@/lib/auth";

const result = await signUpWithEmail(
  "user@example.com",
  "password",
  "Display Name"
);
if (result) {
  console.log("User created:", result.user);
}
```

### Sign In

```tsx
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";

// Email/Password
const result = await signInWithEmail("user@example.com", "password");

// Google OAuth
const result = await signInWithGoogle();
```

### Sign Out

```tsx
import { signOutUser } from "@/lib/auth";

await signOutUser();
```

## User Roles

- **user**: Default role for new users
- **moderator**: Can access moderator features
- **admin**: Full access to all features

Role checking utilities:

```tsx
import { hasRole, isAdmin, isModerator, canAccessRoute } from "@/lib/auth";

// Check specific roles
const canModerate = hasRole(user, ["admin", "moderator"]);
const isUserAdmin = isAdmin(user);

// Check route access
const canAccess = canAccessRoute(user, ["admin"]);
```

## Components

### AuthForm

Handles login and signup with email/password and Google OAuth.

### UserDropdown

Displays user avatar, role, and menu options in the navbar.

### RouteGuard

Protects routes based on authentication and role requirements.

## Customization

### Adding New Roles

1. Update the `User['role']` type in `lib/store/authStore.ts`
2. Add role checking logic in `lib/auth.ts`
3. Update UI components to handle new roles

### Custom Authentication

You can replace Firebase with any authentication provider by updating the functions in `lib/auth.ts`.

### Styling

All components use Tailwind CSS and can be customized by modifying the className props.

## Security Notes

- User roles should be validated on the server side
- The demo mode is for development only
- Always validate permissions on your backend
- Use HTTPS in production
- Implement proper CSRF protection

## Troubleshooting

### Firebase Issues

- Ensure your domain is added to authorized domains in Firebase Console
- Check that authentication methods are enabled
- Verify API keys and configuration

### Route Protection

- Make sure AuthProvider wraps your app
- Check that required roles are correctly specified
- Verify user has the necessary permissions

### State Persistence

- Authentication state is persisted in localStorage
- Clear storage if experiencing issues: `localStorage.clear()`
