import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import styled from 'styled-components';

const Home: NextPage = (props) => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const button = session ? (
    <button onClick={() => signOut()}>Sign out</button>
  ) : (
    <button onClick={() => signIn()}>Sign in</button>
  );

  let userSession = (
    <div>
      <p>You are not logged in</p>
    </div>
  );

  if (session) {
    userSession = (
      <div>
        <p>You are logged in as: {userName}</p>
      </div>
    );
  }

  return (
    <StyledDiv>
      {button}
      {userSession}

      <div>from getStaticProps: {(props as any).timestamp}</div>
      <div>client: {new Date().toISOString()}</div>
    </StyledDiv>
  );
};

export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
    revalidate: 1,
  };
}

export default Home;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 20px;
`;
