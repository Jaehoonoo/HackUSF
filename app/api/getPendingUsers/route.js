import {adminDb} from "@/firebaseadmin";

//Changed logic: this will be faster as users are separated in the query and requests are done in parallel
export async function GET() {
    try {
        const usersRef = adminDb.collection("users");

        const pendingSnapshot = await usersRef
            .where("status", "==", "pending")
            .get();

        const pendingUsers = pendingSnapshot.docs
            .filter(doc => doc.data().email !== "")
            .map(doc => ({id: doc.id, ...doc.data()}));

        const data = {
            pendingUsers: pendingUsers,
            pendingUsersCount: pendingUsers.length,
        }

        return new Response(JSON.stringify({success: true, data: data}), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}