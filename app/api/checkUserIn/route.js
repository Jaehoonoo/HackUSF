import {adminDb} from "@/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json()
        const {userId} = body;

        if (!userId || typeof userId !== "string") {
            return new Response(JSON.stringify({success: false, error: "Invalid or missing userId"}), {status: 400});
        }

        const docRef = adminDb.collection("testUsers").doc(userId);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            console.error("User does not exist");
            return new Response(JSON.stringify({success: false, error: "User does not exist"}), {status: 404});
        }

        const userData = docSnapshot.data();
        const {checkedIn} = userData;

        if (checkedIn) {
            console.error("User already checked in");
            return new Response(JSON.stringify({success: false, error: "User already checked in"}), {status: 409});
        }

        await docRef.update({
            checkedIn: true,
            scannedMeals: {
                breakfast: false,
                lunch1: false,
                dinner: false,
                lunch2: false
            }
        });

        return new Response(JSON.stringify({
            success: true,
            message: `Successfully updated user (${userId}) checked in status to: true`
        }), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}