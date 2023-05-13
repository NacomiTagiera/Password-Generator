import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Password Generator</title>
        <meta
          name="description"
          content="This is a simple web application built using Next.js, TypeScript and Material UI. The app generates random passwords based on user preferences and specifications."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
