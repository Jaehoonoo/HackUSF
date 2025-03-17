import { adminDb } from "@/firebase-admin";

export async function POST(req) {
    try {
        const body = await req.json()
        const { userId } = body;

        const docRef = adminDb.collection("users").doc(userId);
        await docRef.update({
            checkedIn: true,
        });

        return new Response(JSON.stringify({ success: true, message: `Successfully updated user (${userId}) checked in status to: checked in` }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}