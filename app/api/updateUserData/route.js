import {adminDb} from "@/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json()
        const {userId, newStatus} = body;

        const docRef = adminDb.collection("users").doc(userId);

        if (!(newStatus === "accepted" || newStatus === "rejected")) {
            console.error("Status not accepted or rejected");
            return new Response(JSON.stringify({success: false, error: "Invalid status"}), {status: 400});
        }

        const data = {
            status: newStatus,
        };

        await docRef.update(data);

        return new Response(JSON.stringify({
            success: true,
            message: `Successfully updated user (${userId}) status to: ${newStatus}`
        }), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}