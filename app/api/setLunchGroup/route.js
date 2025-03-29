import { adminDb } from "@/firebaseadmin";

export async function POST(req) {
    try {
        const body = await req.json()
        const { users } = body;
        let currGroupCounter = 0;
        const numberOfLunchGroups = 3;

        for (const user of users) {
            if (user.status !== "accepted") continue; //Only process accepted users
            const userId = user.id;
            const docRef = adminDb.collection("users").doc(userId);
            if (user.lunchGroup) continue; //If user already has a lunch group, they will be skipped
            if (user.dietaryRestrictions.length) {
                await docRef.update({
                    "lunchGroup": "priority"
                });
            } else {
                await docRef.update({
                    "lunchGroup": `${(currGroupCounter % numberOfLunchGroups) + 1}`, //Might need to modify depending on how many people we can serve
                });
                currGroupCounter++;
            }
        }

        return new Response(JSON.stringify({ success: true, message: "Successfully updated lunch groups" }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}