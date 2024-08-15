import React, { ChangeEvent } from 'react'
import Image from 'next/image'

import style from './Inputs.module.scss'


interface FunctionalComponente{
    handleFunction: (InputType: string, InputValue: string) => void
    className: string
}



export const NameInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('name', event.target.value)
    }

    return(
        <div className={className}>
            <Image className={style.icon} src="/icon-person.svg" width={0} height={0} alt='ícone de uma pessoa'/>
            <input onChange={getTypedString} type="name" placeholder='nome'></input>
        </div>
        )
}

export const EmailInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('email', event.target.value)
    }

    return(
        <div className={className}>
            <Image className={style.icon} src="/icon-email.svg" width={0} height={0} alt='ícone de email'/>
            <input onChange={getTypedString} type="email" placeholder='email'></input>
        </div>
        )
}

export const PasswordInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('password' , event.target.value)
    }

    return(
    <div className={className}>
        <Image className={style.icon} src="/icon-key.svg" width={0} height={0} alt='ícone de uma chave'/>
        <input onChange={getTypedString} type="password" placeholder='senha'></input>
    </div>
    )
}

export const DateInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('date' , event.target.value)
    }

    return(
    <div className={className}>
        <Image className={style.icon} src="/icon-calendar.svg" width={0} height={0} alt='ícone de um calendario'/>
        <input onChange={getTypedString} type="date"></input>
    </div>
    )
}

export const NumberInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('number' , event.target.value)
    }

    return(
    <div className={className}>
        <Image className={style.icon} src="/icon-coin.svg" width={0} height={0} alt='ícone uma moeda'/>
        <input onChange={getTypedString} type="number" step="0.01" placeholder='valor'></input>
    </div>
    )
}

export const TelInput : React.FC<FunctionalComponente> = ({handleFunction, className}) => {
    const getTypedString = (event : ChangeEvent<HTMLInputElement>) => {
        handleFunction('tel' , event.target.value)
    }

    return(
    <div className={className}>
        <Image className={style.icon} src="/icon-phone.svg" width={0} height={0} alt='ícone de um telefone'/>
        <input onChange={getTypedString} type="tel" placeholder='telefone'></input>
    </div>
    )
}