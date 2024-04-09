import styles from './Inputs.module.scss'
import { ChangeEvent } from 'react'

interface FunctionalComponente{
    handleFunction: (parameter:string)=> void 
}
export const EmailInput : React.FC<FunctionalComponente> = ({handleFunction}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction(event.target.value)
    }

    return(
        <div className={styles.inputWrapper}>
            <p>insert icon</p>
            <input onChange={getTypedString} className={styles.input} type="email"></input>
        </div>
        )
}

export const PasswordInput : React.FC<FunctionalComponente> = ({handleFunction}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction(event.target.value)
    }

    return(
    <div className={styles.inputWrapper}>
        <p>insert icon</p>
        <input onChange={getTypedString} className={styles.input} type="password"></input>
    </div>
    )
}