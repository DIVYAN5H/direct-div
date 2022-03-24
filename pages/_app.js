import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, fv } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log(user)
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: fv.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      db.collection("chats").add({
        users: [user.email, "divyanshvermafast4@gmail.com"],
      });
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
