// app/layout.tsx

import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, Container } from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

// 定义全局属性，以检查是否已初始化 GA
declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ContentProps = {
    mih: "80vh",
    mt: "sm",
  };

  const router = useRouter();

  useEffect(() => {
    // 初始化 GA4，确保只进行一次
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("G-CQHL0PZBRG"); // 替换 'G-CQHL0PZBRG' 为你的 GA4 测量 ID
      window.GA_INITIALIZED = true;
    }

    const handleRouteChange = (url: string) => {
      // 当路由变化时发送页面访问
      ReactGA.send({ hitType: "pageview", page: url });
    };

    // 监听路由变化事件
    router.events.on("routeChangeComplete", handleRouteChange);

    // 组件卸载时取消监听
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <html lang="en">
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body>
        <ErrorBoundary>
          <MantineProvider theme={theme} forceColorScheme="dark">
            <Header />
            <Container size="responsive" {...ContentProps} className="content">
              {children}
            </Container>
            <Footer />
          </MantineProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
