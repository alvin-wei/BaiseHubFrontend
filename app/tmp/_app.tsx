import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, Container } from "@mantine/core";
import { theme } from "../../theme";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export default function App({ Component, pageProps }: any) {
  const ContentProps = {
    h: "80vh",
    w: "80vw",
    mt: "sm",
  };

  return (
    <>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <ErrorBoundary>
        <MantineProvider theme={theme} forceColorScheme="dark">
          {/* defaultColorScheme="dark" */}
          <Header />
          <Container size="responsive" {...ContentProps}>
            <Component {...pageProps} />
          </Container>
          <Footer />
        </MantineProvider>
      </ErrorBoundary>
    </>
  );
}
