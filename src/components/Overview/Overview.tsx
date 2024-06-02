import { NewPayer } from "../Forms/Forms"

import { useState } from "react"

import  style  from "./Overview.module.scss"

export default function Overview () {
    const [totalPayers, setTotalPayers] = useState()

    async function getData () {
        const response = await fetch('http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/go0zcDhH9XaXcx8H30ixgLpvO7t2')
        const data = await response.json()
        setTotalPayers(data.totalPayers)}
    getData()
    return(
    <div className={style.grid}>
        <div>
            <h2>Insights</h2>
            <div>
                <div>
                    <p>n° de Pagantes</p>
                    <p>icon</p>
                    <p>{totalPayers}</p>
                </div>
            </div>
        </div>

        <div>
            <h2>Registrar</h2>
            <NewPayer/>
        </div>
    </div>
    )
}