import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "80vh" }}>
      <div>
        <img src="logo.svg" alt="" height={200} style={{ marginBottom: 10 }} />
      <Circle color="#000000" size={60} />
      </div>
    </center>
  );
}

export default Loading;
