import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Password Generator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is a simple web application built using Next.js, TypeScript and Material UI. The app generates random passwords based on user preferences and specifications."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
