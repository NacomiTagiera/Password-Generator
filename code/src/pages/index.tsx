import { Fragment } from "react";
import Head from "next/head";
import PasswordGenerator from "@/components/PasswordGenerator";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Password Generator</title>
        <meta
          name="description"
          content="This is a simple web application built using Next.js and Material UI. The app generates random passwords based on user preferences and specifications."
        />
      </Head>
      <PasswordGenerator />
    </Fragment>
  );
}
