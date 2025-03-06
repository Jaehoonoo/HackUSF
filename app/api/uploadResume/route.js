import { db } from "@/firebase"; // Firestore database instance  
import { doc, updateDoc } from "firebase/firestore";

import { google } from "googleapis";
import { writeFile, mkdir, unlink } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import path from "path";

// Load service account credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
    token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: "v3", auth });

const FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID

export async function POST(request) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Parse the FormData directly from the request
    const formData = await request.formData();
    const userId = formData.get("userId");
    const file = formData.get("resume");
    
    if (!file || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing file or userId" }),
        { status: 400 }
      );
    }

    // Check file size (500KB limit)
    if (file.size > 500 * 1024) {
      return new Response(
        JSON.stringify({ error: "File size exceeds 500KB limit" }),
        { status: 400 }
      );
    }

    // Get file details
    const fileName = file.name;
    const mimeType = file.type;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file to temporary location
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);
    
    // Upload to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [FOLDER_ID],
    };

    const media = {
      mimeType: mimeType,
      body: createReadStream(filePath),
    };

    const uploadResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });

    const fileUrl = uploadResponse.data.webViewLink;

    // Update Firestore User Profile with Resume URL
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { resumeURL: fileUrl });

    // Delete the file from the uploads folder after successful upload
    await unlink(filePath);

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully!', 
        fileUrl 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during file upload:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}