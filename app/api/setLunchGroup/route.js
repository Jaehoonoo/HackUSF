import {adminDb} from "@/firebaseadmin";
import {FieldValue} from "firebase-admin/firestore";

export async function POST(req) {
    try {
        const body = await req.json()
        const {userId} = body;
        const userRef = adminDb.collection("users").doc(userId);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            return new Response(JSON.stringify({success: false, message: "User does not exist"}), {status: 200});
        }

        const userData = userSnap.data();
        //If user already has a lunch group, they will be skipped
        if (userData.lunchGroup) {
            return new Response(JSON.stringify({
                success: false,
                message: "User already assigned lunch group"
            }), {status: 200});
        }

        const lunchGroupSizesRef = adminDb.collection("userCounts").doc("mealGroupCounts");

        await adminDb.runTransaction(async (transaction) => {
            const lunchGroupSizesSnap = await transaction.get(lunchGroupSizesRef);
            const lunchGroupSizes = lunchGroupSizesSnap.exists ? lunchGroupSizesSnap.data() : {
                "1": 0,
                "2": 0,
                "3": 0,
                "priority": 0
            };

            // Check for dietary restrictions and assign to priority group if needed
            if (userData.dietaryRestrictions && userData.dietaryRestrictions.length) {
                transaction.update(userRef, {lunchGroup: "Priority"});
                transaction.update(lunchGroupSizesRef, {
                    priority: FieldValue.increment(1)
                });
            } else {
                // Determine the smallest group
                const group1Size = lunchGroupSizes["1"] || 0;
                const group2Size = lunchGroupSizes["2"] || 0;
                const group3Size = lunchGroupSizes["3"] || 0;
                const smallestGroup = [group1Size, group2Size, group3Size].indexOf(Math.min(group1Size, group2Size, group3Size)) + 1;

                // Update the user's lunch group
                transaction.update(userRef, {lunchGroup: `Group ${smallestGroup.toString()}`});

                // Update the count for the assigned group
                transaction.update(lunchGroupSizesRef, {
                    [`${smallestGroup}`]: FieldValue.increment(1)
                });
            }
        });

        return new Response(JSON.stringify({
            success: true,
            message: "Successfully updated lunch groups"
        }), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}
