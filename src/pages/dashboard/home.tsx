import Navbar from "../../components/Navbar/Navbar"
import style from "../../styles/pages.module.scss"
import Overview from "@/components/Overview/Overview"

export default function Home(){
    return(
    <div className={style.home}>
        <Navbar/>
        <section>
            <Overview/>
        </section>
    </div>
    )
}