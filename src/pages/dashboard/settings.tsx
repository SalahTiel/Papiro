import {Navbar} from "@/components/Navbar/Navbar"
import { NameInput, EmailInput, PasswordInput } from "@/components/design_system/Inputs/Inputs"
import { SubmitButton } from "@/components/design_system/Buttons/Buttons"

import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

import style from '../../styles/pages.module.scss'
import inputStyle from '../../components/design_system/Inputs/Inputs.module.scss'
import { useEffect, useState } from "react"

export default function Settings(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [uid, setUid] = useState<string | null>('')
    const redirect = useRouter()

    useEffect(()=>{
        setUid(localStorage.getItem('uid'))
    })

    const changeInputValue = (InputType: string, InputValue: string) => {
        switch(InputType){
            case 'name':
                setName(InputValue)
                break
            case 'email':
                setEmail(InputValue)
                break
            case 'password':
                setPassword(InputValue)
                break
        }
    }

    const UpdateUser = async (event: React.FormEvent <HTMLFormElement>) => {
        event.preventDefault()

        //check which fields will be updated and place them in the data object
        const data : { [key: string]:string} =  {}
        if(name.length > 0){
            data.name = name
        }
        if(email.length > 0){
            data.email = name
        }
        if(password.length > 0){
            data.password = name
        }
        
        const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}`,
            {
                method: 'PUT',
                body : JSON.stringify(data),
                headers:{
                    "Content-Type" : "application/json"
                }
            }
        )
    }

    const deleteUser = async () =>{
        const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}`,{method: 'DELETE'})
        redirect.push('/')

    }

    return<>
        <Head>
            <title>Papiro | Configurações</title>
            <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
        </Head>

        <div className={style.settings}>
            <Navbar currentPage={'settings'}/>
            <div className={style.console}>
                <h2>Configurações</h2>
                <h3>Configurações da conta</h3>
                <form onSubmit={UpdateUser}>
                    <div className={style.row}>
                        <p>Alterar nome:</p>
                        <NameInput handleFunction={changeInputValue} className={inputStyle.settingsAccountInput}/>
                    </div>

                    <div className={style.row}>
                        <p>Alterar email:</p>
                        <EmailInput handleFunction={changeInputValue} className={inputStyle.settingsAccountInput}/>
                    </div>

                    <div className={style.row}>
                        <p>Alterar senha:</p>
                        <PasswordInput handleFunction={changeInputValue} className={inputStyle.settingsAccountInput}/>
                    </div>
                    
                    <div className={style.info}>
                        <Image className={style.icon} src="/icon-info.svg" width={0} height={0} alt="ícone de informação"/>
                        <p>Insira apenas os campos que deseja alterar</p>
                    </div>

                    <div className={style.buttons}>
                        <button type="button" onClick={deleteUser} className={style.delete}>Deletar conta</button>
                        <SubmitButton buttonType="registerButton" text="Atualizar dados"/>
                    </div>
                </form>
            </div>
            
        </div>
        
        
    </>
}