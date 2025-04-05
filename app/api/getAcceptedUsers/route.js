import {adminDb} from "@/firebaseadmin";

//Changed logic: this will be faster as users are separated in the query and requests are done in parallel
export async function GET() {
    try {
        const usersRef = adminDb.collection("users");
        const [acceptedSnapshot, rejectedSnapshot, pendingSnapshot] = await Promise.all([
            usersRef.where("status", "==", "accepted").get(),

        ]);

        const acceptedUsers = acceptedSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        const data = {
            acceptedUsers: acceptedUsers,
        }

        return new Response(JSON.stringify({success: true, data: data}), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}