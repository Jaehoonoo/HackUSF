import {adminDb} from "@/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json();
        const {userId, currentLunchGroup, currentMeal} = body;
        const validMeals = ["breakfast", "lunch1", "lunch2", "dinner"];

        if (!userId || typeof userId !== "string" ||
            !currentLunchGroup || typeof currentLunchGroup !== "string" ||
            !currentMeal || typeof currentMeal !== "string") {
            console.error("Invalid request body type or length");
            return new Response(JSON.stringify({
                success: false,
                error: "Bad request: Invalid or missing fields"
            }), {status: 400});
        }

        if (!validMeals.includes(currentMeal)) {
            console.error("Invalid meal type");
            return new Response(JSON.stringify({
                success: false,
                error: "Bad request: Invalid or missing fields"
            }), {status: 400});
        }

        const docRef = adminDb.collection("users").doc(userId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            console.error("User does not exist");
            return new Response(JSON.stringify({
                success: false,
                error: "Not found: Resource or page not found"
            }), {status: 404});
        }

        const userData = docSnapshot.data();
        const userLunchGroup = userData.lunchGroup;

        if (userLunchGroup !== currentLunchGroup) {
            console.error("Not current user's lunch group");
            return new Response(JSON.stringify({
                success: false,
                error: "Invalid permission: Request needs different permission status"
            }), {status: 403});
        }

        const userScannedMeals = userData.scannedMeals || {};

        if (userScannedMeals[currentMeal]) {
            console.error("User already scanned this meal");
            return new Response(JSON.stringify({
                success: false,
                error: "State conflict: Request state incompatible with resource state"
            }), {status: 409});
        }

        // Update just the specific meal
        await docRef.update({
            [`scannedMeals.${currentMeal}`]: true
        });

        return new Response(JSON.stringify({
            success: true,
            message: `Successfully checked in user (${userId}) for lunch ${currentLunchGroup}`
        }), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}