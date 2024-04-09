import React from "react";
import Head from "next/head";
import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import { LoginForm } from "@/components/Forms/Forms";
import {Maven_Pro, MuseoModerno} from "next/font/google"

const mainFont = Maven_Pro({
  weight: ['400'],
  subsets: ['latin']
})
const titleFont = MuseoModerno({
  weight: ['400'],
  subsets: ['latin']
}) 

export default function Home() {
  return (
    <main className={mainFont.className}>
    <Head>
      <title>Papiro</title>
      <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
    </Head>
    <LoginWrapper>
      <LoginForm/>
    </LoginWrapper>
    </main>
  );
}
