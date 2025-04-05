import {adminDb} from "@/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json()
        const {userId} = body;

        if (!userId || typeof userId !== "string") {
            return new Response(JSON.stringify({success: false, message: "Invalid or missing userId"}), {status: 200});
        }

        const docRef = adminDb.collection("users").doc(userId);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            console.error("User does not exist");
            return new Response(JSON.stringify({success: false, message: "User does not exist"}), {status: 200});
        }

        const userData = docSnapshot.data();
        const {checkedIn} = userData;

        if (checkedIn) {
            return new Response(JSON.stringify({success: false, message: `${userData.firstName} ${userData.lastName} already checked in`}), {status: 200});
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
            message: `Successfully checked in ${userData.firstName} ${userData.lastName}`,
        }), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}