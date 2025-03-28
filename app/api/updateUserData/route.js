import { adminDb } from "@/HackUSF/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json()
        const { userId, newStatus } = body;

        const docRef = adminDb.collection("users").doc(userId);

        let data = {};

        if (newStatus === "accepted") {
            data = {
                status: newStatus,
                scannedMeals: {
                    breakfast: false,
                    lunch1: false,
                    dinner: false,
                    lunch2: false,
                }
            }
        } else if (newStatus === "rejected") {
            data = {
                status: newStatus,
            }
        }

        await docRef.update(data);

        return new Response(JSON.stringify({ success: true, message: `Successfully updated user (${userId}) status to: ${newStatus}` }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}