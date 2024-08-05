import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.scss"

export default function Navbar(){
    return(
        <div>
            <Image src="/logo.svg" width={100} height={100} alt="logo" />
            <nav className={style.navbar}>
                <ul>
                    <li>
                        <Link href={'/dashboard/home'}>Dashboard</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/configuracoes'}>Configurações</Link>
                    </li>
                </ul>
            </nav>

            <div className={style.perfil}>
                <Image src="/favicon.png" width={50} height={50} alt="icon"/>
                <p>name</p>
                <Link href={'/'}>sair</Link>
            </div>
        </div>
    )
}