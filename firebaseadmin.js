import admin from "firebase-admin";
import config from "./firebaseadminkey.js"

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(config),
    })
}

const adminDb = admin.firestore();
export { adminDb };