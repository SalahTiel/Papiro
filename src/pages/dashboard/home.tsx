import {Navbar} from "../../components/Navbar/Navbar"
import style from "../../styles/pages.module.scss"
import Overview from "@/components/Overview/Overview"
import Head from "next/head";

export default function Home(){
    return(
    <>
        <Head>
            <title>Papiro | Dashboard</title>
            <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
        </Head>
        
        <div className={style.home}>
            <Navbar currentPage={'dashboard'}/>
            <section>
                <Overview/>
            </section>
        </div>
    </>
    )
}