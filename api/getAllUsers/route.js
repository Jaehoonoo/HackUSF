import {adminDb} from "@/firebaseadmin";

//Changed logic: this will be faster as users are separated in the query and requests are done in parallel
export async function GET() {
  try{
    const usersRef = adminDb.collection("users");
    const [acceptedSnapshot, rejectedSnapshot, pendingSnapshot] = await Promise.all([
      usersRef.where("status", "==", "accepted").get(),
      usersRef.where("email", "==", "rejected").get(),
      usersRef.where("status", "==", "pending").get()
    ]);

    const acceptedUsers = acceptedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const rejectedUsers = rejectedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const pendingUsers = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const data = {
      acceptedUsers: acceptedUsers,
      rejectedUsers: rejectedUsers,
      pendingUsers: pendingUsers,
      acceptedUsersCount: acceptedUsers.length,
      rejectedUsersCount: rejectedUsers.length,
      pendingUsersCount: pendingUsers.length,
    }

    return new Response(JSON.stringify({ success: true, data: data }), { status: 200 });

  }  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}