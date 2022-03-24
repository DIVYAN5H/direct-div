import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, fv } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log(user);
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: fv.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      if (user.email != "divyanshvermafast4@gmail.com") {
        db.collection("chats").doc(`${user.email}-div`).set({
          users: [user.email, "divyanshvermafast4@gmail.com"],
        });
        db.collection("chats").doc(`${user.email}-div`).collection("messages").add({
          timestamp: fv.serverTimestamp(),
          message: "Hello, Welcome to group-div.",
          user: "divyanshvermafast4@gmail.com",
          photoURL: "https://lh3.googleusercontent.com/a-/AOh14Gjo3sPcHVcJtdNi5S7QhgYUs8iYcbRo7-EsTO95ApE=s96-c",
        });
      }
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
