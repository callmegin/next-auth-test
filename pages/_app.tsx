import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface CustomProps {
  session: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & CustomProps> => {
  const appProps = await App.getInitialProps(appContext);
  const session = (await getSession(appContext.ctx)) as Session;
  return { ...appProps, session };
};

export default MyApp;
