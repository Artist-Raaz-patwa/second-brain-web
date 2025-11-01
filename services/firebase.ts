import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

/**
 * -----------------------------------------------------------------------------
 * 🔥🔥🔥 IMPORTANT: FIREBASE CONFIGURATION 🔥🔥🔥
 * -----------------------------------------------------------------------------
 * 1. Go to your Firebase project console: https://console.firebase.google.com/
 * 2. In your project settings, find the "General" tab.
 * 3. Under "Your apps", click the web icon (</>) to get your config object.
 * 4. Copy the firebaseConfig object and paste it below, replacing the placeholder values.
 *    - The `databaseURL` is crucial and should look like: https://<your-project-id>-default-rtdb.firebaseio.com
 * 5. Enable Google Authentication in the Firebase console:
 *    - Go to "Authentication" -> "Sign-in method" -> "Google" and enable it.
 * 6. Set up the Realtime Database:
 *    - Go to "Realtime Database" -> "Create database".
 *    - Start in "test mode" for easy setup. For production, configure security rules.
 *    - A good starting security rule for authenticated users is:
 *      {
 *        "rules": {
 *          "users": {
 *            "$uid": {
 *              ".read": "$uid === auth.uid",
 *              ".write": "$uid === auth.uid"
 *            }
 *          }
 *        }
 *      }
 * -----------------------------------------------------------------------------
 */
const firebaseConfig = {
  // NOTE: I've populated this configuration from the code that was misplaced in another file.
  // You still need to replace "YOUR_API_KEY" with your actual key from the Firebase Console.
  apiKey: "AIzaSyCe6L8r6mJKNr7vSwgCiLWhmgWwjEtqToQ",
  authDomain: "sbapp-16b81.firebaseapp.com",
  databaseURL: "https://sbapp-16b81-default-rtdb.firebaseio.com",
  projectId: "sbapp-16b81",
  storageBucket: "sbapp-16b81.appspot.com",
  messagingSenderId: "211860052111",
  appId: "1:211860052111:web:2da4a0cca0bb7ac49078fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service and export it for use in other files
export const db = getDatabase(app);

// Get a reference to the auth service and export it for use in other files
export const auth = getAuth(app);