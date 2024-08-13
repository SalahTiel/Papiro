import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.scss"
import { useEffect, useState } from "react";

interface navbarProps{
    currentPage: string
}

export const Navbar : React.FC<navbarProps> = ({currentPage}) => {
    console.log(currentPage)
    const [name, setName] = useState<string | null>('')

    useEffect(()=>{
        setName(localStorage.getItem('displayName'))
    })

    return(
        <div className={style.navbar}>
            <Image className={style.logo} src="/logo.svg" width={0} height={0} alt="brand logo" />
            <nav>
                <ul>
                    {currentPage == 'dashboard' ? 
                    (<li>
                        <Image className={style.icon} src="/icon-home-selected.svg" width={0} height={0} alt="home icon" />
                        <Link className={style.selected} href={'/dashboard/home'}>Dashboard</Link>
                    </li>) : 
                    (<li>
                        <Image className={style.icon} src="/icon-home.svg" width={0} height={0} alt="home icon" />
                        <Link href={'/dashboard/home'}>Dashboard</Link>
                    </li>)}

                    {currentPage == 'settings' ? 
                    (<li>
                        <Image className={style.icon} src="/icon-settings-selected.svg" width={0} height={0} alt="home icon" />
                        <Link className={style.selected} href={'/dashboard/settings'}>Configurações</Link>
                    </li>) : 
                    (<li>
                        <Image className={style.icon} src="/icon-settings.svg" width={0} height={0} alt="home icon" />
                        <Link href={'/dashboard/settings'}>Configurações</Link>
                    </li>)}
                    
                    
                </ul>
            </nav>

            <div className={style.perfil}>
                {name != 'undefined' ? (<p>{name}</p>) : <p></p>}
                    
                <Link href={'/'}>
                    <Image className={style.icon} src="/icon-exit.svg" width={0} height={0} alt="icone de sair"/>Sair
                </Link>
            </div>
        </div>
    )
}