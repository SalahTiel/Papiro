import Navbar from "@/components/Navbar/Navbar"
import { NameInput, EmailInput, PasswordInput } from "@/components/design_system/Inputs/Inputs"
import { SubmitButton } from "@/components/design_system/Buttons/Buttons"

import { useState } from "react"

export default function Configuracoes(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        
        const response = await fetch('http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/LRODU3734lVNeqpc4rD4X7Ky5kA3',
            {
                method: 'PUT',
                body : JSON.stringify(data),
                headers:{
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(response)
    }
    return<>
        <Navbar/>
        <h2>Consfigurações</h2>
        <h3>Configurações da conta</h3>
        <form onSubmit={UpdateUser}>
            <NameInput handleFunction={changeInputValue} className=""/>
            <EmailInput handleFunction={changeInputValue} className=""/>
            <PasswordInput handleFunction={changeInputValue} className=""/>
            <button>Deletar conta</button>
            <SubmitButton text="atualizar"/>
        </form>
        
    </>
}