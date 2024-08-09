import React, { ChangeEvent } from 'react'

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
            <p>insert icon</p>
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
            <p>insert icon</p>
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
        <p>insert icon</p>
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
        <p>insert icon</p>
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
        <p>insert icon</p>
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
        <p>insert icon</p>
        <input onChange={getTypedString} type="tel" placeholder='telefone'></input>
    </div>
    )
}