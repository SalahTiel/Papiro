import Navbar from "../../components/Navbar/Navbar"
import style from "../../styles/pages.module.scss"

export default function Home(){
    return(
    <div className={style.home}>
        <Navbar/>
        <section>
            <h2>visão geral</h2>
        </section>
    </div>
    )
}