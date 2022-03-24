import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Direct</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Sidebar />
    </div>
  );
}
