import React from "react";
import Head from "next/head";
import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import { LoginForm } from "@/components/Forms/Forms";
import {Plus_Jakarta_Sans} from "next/font/google"
import style from '../styles/pages.module.scss'



export default function Home() {
  return (
  <>
    <Head>
      <title>Papiro | Login</title>
      <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
    </Head>

    <main className={style.index}>
      <LoginWrapper>
        <LoginForm/>
      </LoginWrapper>
    </main>
  </>
  );
}
