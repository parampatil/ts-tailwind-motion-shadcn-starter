// Firebase configuration template
// Copy this file to firebase.ts and replace with your actual Firebase config

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-auth-domain-here",
  projectId: "your-project-id-here",
  storageBucket: "your-storage-bucket-here",
  messagingSenderId: "your-messaging-sender-id-here",
  appId: "your-app-id-here",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;

/*
To set up Firebase:

1. Go to https://console.firebase.google.com/
2. Create a new project or use an existing one
3. Enable Authentication and choose your sign-in methods (Email/Password, Google, etc.)
4. Go to Project Settings > General > Your apps
5. Click "Add app" and choose "Web"
6. Copy the config object and replace the values above
7. Rename this file from firebase.template.ts to firebase.ts
8. Update lib/auth.ts to import auth from this file instead of using the placeholder

For Google OAuth:
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Google sign-in provider
3. Add your domain to authorized domains
4. Make sure to set up OAuth consent screen in Google Cloud Console
*/
