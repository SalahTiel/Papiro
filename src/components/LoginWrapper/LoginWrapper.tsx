import Image from "next/image"
import styles from "./LoginWrapper.module.scss"


export default function LoginWrapper(props: {children: React.ReactNode} ){
    return(
        <div className={styles.loginWrapper}>
            <div className={styles.loginWrapper__leftSide}>
                
            </div>

            <div className={styles.loginWrapper__content}>
                <Image className={styles.loginWrapper__content__logo} src="logo.svg" width={0} height={0} alt="logo"/>
                {props.children}
            </div>
        </div>
    )
}

