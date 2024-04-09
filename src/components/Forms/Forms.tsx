import { EmailInput, PasswordInput } from "../design_system/Inputs/Inputs";
import { SubmitButton } from "../design_system/Buttons/Buttons";
import Link from "next/link";

import { useState, useEffect, useId } from "react";
import { useRouter } from "next/router";

import {UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../../services/firebaseConfig"

import style from './Forms.module.scss'



export function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSuccessful] = useState(false)
    const redirect = useRouter()

    //get input values
    const changeEmailInputValue = (InputValue : string) => {
        setEmail(InputValue) 
    }
    const changePasswordInputValue = (InputValue : string) =>{
        setPassword(InputValue)
    }

    //redirect when login successful
    useEffect(()=>{
        if(loginSuccessful){
            redirect.push('/dashboard/home')
        }
    }, [loginSuccessful])

    //login using firebase authentication
    const login = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const span = document.querySelector('span') 
        signInWithEmailAndPassword(auth, email, password)
        .then((credentials : UserCredential)=>{
            const userEmail = credentials.user.email
            //check if received value is not null and saves credetials in sessionStorage
            if (userEmail){
                sessionStorage.setItem("userEmail", userEmail)
            }
            setLoginSuccessful(true)
        })
        .catch((error : Error)=>{
            if(span){
            span.style.display = 'block'
            }
        })
    }

    return(
    <form onSubmit={login}>
        <legend>Olá! Faça login</legend>
        <span className={style.errorFormMessage}>credencias inválidas</span>
        <EmailInput handleFunction={changeEmailInputValue} />
        <PasswordInput handleFunction={changePasswordInputValue}/>
        <SubmitButton text="entrar"/>
        <Link href="/register">Registre-se</Link>
    </form>
    )
}



export function RegisterForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newUserRegistered, setNewUserRegistered] = useState(false)

    //get input values
    const changeEmailInputValue = (InputValue : string) => {
        setEmail(InputValue) 
    }
    const changePasswordInputValue = (InputValue : string) =>{
        setPassword(InputValue)
    }

    //register new user using firebase authentication and native form validation
    const registerUser = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const regularExpressions = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const span = document.querySelectorAll('span')

        if(regularExpressions.test(email) && password.length >= 6){
            createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                //set new user on firestore
                setDoc(doc(db, "users", credentials.user.uid),{})
                setNewUserRegistered(true)
            })
            .catch((error: Error ) => {
                console.log(error.message)
        })
        }
        else if(regularExpressions.test(email) == false && password.length >= 6){
            if(span){
                span[0].style.display = 'block'
               }
        }
        else if(regularExpressions.test(email) && password.length < 6){
            if(span){
                span[1].style.display = 'block'
               }
        }
        else{
           if(span){
            span[0].style.display = 'block'
            span[1].style.display = 'block'
           }
        }
    }

    //conditional rendering
    if(!newUserRegistered){
        return (
            <form onSubmit={registerUser}>
                <legend>Seja bem-vindo! Registre-se</legend>
                <span className={style.errorFormMessage}>email inválido</span>
                <span className={style.errorFormMessage}>a senha deve conter no minimo seis caracteres</span>
                <EmailInput handleFunction={changeEmailInputValue}/>
                <PasswordInput handleFunction={changePasswordInputValue}/>
                <SubmitButton text="register"/>
                <Link href="/">ir para login</Link>
            </form>
        )
    }
    else{
        return(
            <div>
                <p>novo usuário registrado. Faça login</p>
                <Link href="/">fazer login</Link>
            </div>
        )
    }
}




