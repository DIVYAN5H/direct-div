import { Button } from "@material-ui/core";
import ArrowRightOutlinedIcon from "@material-ui/icons/ArrowRightOutlined";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="../logo.svg" />
        <Button onClick={signIn}>
          <ArrowRightOutlinedIcon />
          Sign-in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 0px 0px 70px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  margin-bottom: 50px;
`;
