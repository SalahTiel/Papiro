import { EmailInput, PasswordInput, NameInput, DateInput, NumberInput, TelInput } from "../design_system/Inputs/Inputs";
import { SubmitButton } from "../design_system/Buttons/Buttons";
import Link from "next/link";

import { useState, useEffect, useId, use } from "react";
import { useRouter } from "next/router";

import {UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../../services/firebaseConfig"

import style from './Forms.module.scss'
import Inputstyle from '../design_system/Inputs/Inputs.module.scss'



export function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSuccessful] = useState(false)
    const redirect = useRouter()

    //get input values
    const changeInputValue = (InputType: string, InputValue : string) => {
        switch(InputType){
            case 'email':
                setEmail(InputValue)
                break
            case 'password':
                setPassword(InputValue)
                break
        }
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
            const uid = credentials.user.uid
            //check if received value is not null and saves credetials in sessionStorage
            if (uid && userEmail){
                sessionStorage.setItem("uid", uid)
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
        <EmailInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper} />
        <PasswordInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
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
    const changeInputValue = (InputType: string, InputValue : string) => {
        switch(InputType){
            case 'email':
                setEmail(InputValue)
                break
            case 'password':
                setPassword(InputValue)
                break
        }
    }

    //register new user using firebase authentication and validate the form natively
    //set a new user document on "users" collection in firestore database
    //create payers collection on user document
    const registerUser = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const regularExpressions = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const span = document.querySelectorAll('span')

        if(regularExpressions.test(email) && password.length >= 6){
            createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                //set new user on firestore database
                const uid = credentials.user.uid
                const data = {
                    'totalPayers' : 0,
                    'revenue' : 0
                }
                setDoc(doc(db, "users", uid),data)

                try{
                    const reference = doc(db, 'users', credentials.user.uid)
                    console.log(reference)
                }catch(error){
                    console.log(error)
                }

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
        return(
            <form onSubmit={registerUser}>
                <legend>Seja bem-vindo! Registre-se</legend>
                <span className={style.errorFormMessage}>email inválido</span>
                <span className={style.errorFormMessage}>a senha deve conter no minimo seis caracteres</span>
                <EmailInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
                <PasswordInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
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



export function NewPayer(){
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    
    const changeInputValue = (InputType: string, InputValue : string) => {
        switch (InputType){
            case 'name':
                setName(InputValue) 
                break
            case 'date':
                setDate(InputValue)
                break
            case 'number':
                setValue(InputValue)
                break
            case 'tel':
                setTel(InputValue)
                break
            case 'email':
                setEmail(InputValue)
                break
        }
    }
    
    async function registerNewPayer(event: React.FormEvent <HTMLFormElement>){
        event.preventDefault()
        const data = {
            name, date, value, tel, email
        }
        const response = await fetch('http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/go0zcDhH9XaXcx8H30ixgLpvO7t2',
        {
            method: "POST",
            body:  JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"
            }
        }
        )
    }
    return(
        <form onSubmit={registerNewPayer}>
            <NameInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
            <DateInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
            <NumberInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
            <TelInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
            <EmailInput handleFunction={changeInputValue} className={Inputstyle.inputWrapper}/>
            <SubmitButton text="registrar"/>
        </form>
    )
}



