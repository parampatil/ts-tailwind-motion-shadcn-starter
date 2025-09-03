import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth,
} from "firebase/auth";
import { toast } from "sonner";
import { User, AuthResponse } from "@/types/auth";

// Firebase configuration placeholder - users need to replace with their own
export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-auth-domain-here",
  projectId: "your-project-id-here",
  storageBucket: "your-storage-bucket-here",
  messagingSenderId: "your-messaging-sender-id-here",
  appId: "your-app-id-here",
};

// Placeholder Firebase auth instance
// Users need to initialize Firebase in their own firebase.ts file
const auth: Auth | null = null;

// Helper function to convert Firebase user to our User type
const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    role: "user", // Default role, should be fetched from your database
    createdAt: firebaseUser.metadata.creationTime,
  };
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    if (!auth) {
      toast.error("Firebase not initialized. Please configure Firebase.");
      return null;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = convertFirebaseUser(userCredential.user);

    // Here you would typically save additional user data to your database
    // await saveUserToDatabase(user)

    toast.success("Account created successfully!");
    return {
      user,
      token: await userCredential.user.getIdToken(),
    };
  } catch (error: unknown) {
    console.error("Sign up error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create account";
    toast.error(errorMessage);
    return null;
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    if (!auth) {
      // Placeholder for when Firebase is not configured
      // For demo purposes, allow any email/password combination
      const demoUser: User = {
        uid: "demo-" + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split("@")[0],
        role: "user",
        createdAt: new Date().toISOString(),
      };

      toast.success("Signed in successfully! (Demo mode)");
      return {
        user: demoUser,
        token: "demo-token-" + Math.random().toString(36).substr(2, 9),
      };
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = convertFirebaseUser(userCredential.user);

    toast.success("Signed in successfully!");
    return {
      user,
      token: await userCredential.user.getIdToken(),
    };
  } catch (error: unknown) {
    console.error("Sign in error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to sign in";
    toast.error(errorMessage);
    return null;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthResponse | null> => {
  try {
    if (!auth) {
      // Demo Google sign in
      const demoUser: User = {
        uid: "google-demo-" + Math.random().toString(36).substr(2, 9),
        email: "demo@gmail.com",
        displayName: "Demo User",
        photoURL: "https://via.placeholder.com/150",
        role: "user",
        createdAt: new Date().toISOString(),
      };

      toast.success("Signed in with Google! (Demo mode)");
      return {
        user: demoUser,
        token: "google-demo-token-" + Math.random().toString(36).substr(2, 9),
      };
    }

    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = convertFirebaseUser(userCredential.user);

    toast.success("Signed in with Google!");
    return {
      user,
      token: await userCredential.user.getIdToken(),
    };
  } catch (error: unknown) {
    console.error("Google sign in error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to sign in with Google";
    toast.error(errorMessage);
    return null;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
    toast.success("Signed out successfully!");
    return true;
  } catch (error: unknown) {
    console.error("Sign out error:", error);
    toast.error("Failed to sign out");
    return false;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    return () => {}; // Return empty unsubscribe function
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user = convertFirebaseUser(firebaseUser);
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Role-based access control helpers
export const hasRole = (user: User | null, roles: User["role"][]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ["admin"]);
};

export const isModerator = (user: User | null): boolean => {
  return hasRole(user, ["admin", "moderator"]);
};

// Route protection helper
export const canAccessRoute = (
  user: User | null,
  requiredRoles?: User["role"][]
): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return !!user; // Just need to be authenticated
  }
  return hasRole(user, requiredRoles);
};
