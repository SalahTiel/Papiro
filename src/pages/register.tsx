import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import { RegisterForm } from "@/components/Forms/Forms";
import style from '../styles/pages.module.scss'
import Head from "next/head";

export default function Home() {
    return (
    <>
    <Head>
      <title>Papiro | Registro</title>
      <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
    </Head>

      <main className={style.index}>
        <LoginWrapper>
          <RegisterForm/>
        </LoginWrapper>
      </main>
    </>
    );
  }