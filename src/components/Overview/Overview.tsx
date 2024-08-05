import { NewPayer } from "../Forms/Forms"
import { PayersList } from "../Registry/Registry"
import { DebtList } from "../DebtList/DebtList"

import { useState, useEffect } from "react"

import  style  from "./Overview.module.scss"

export default function Overview () {
    const [totalPayers, setTotalPayers] = useState()
    const [revenue, setRevenue] = useState()
    const [payers, setPayers] = useState([])
    const [debts, setDebts] = useState([])
    const [uid, setUid] = useState<string | null>(null)

    async function getData () {
        if(uid){
            const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}`)
            const data = await response.json()
            setPayers(data.payersData)
            setDebts(data.debtlist)
            setTotalPayers(data.insightsData.totalPayers)
            setRevenue(data.insightsData.revenue)
        }
    }
        
    useEffect(()=>{
        setUid(localStorage.getItem('uid'))
    })

    useEffect(()=>{
        getData()
    },[])
    
    if(uid === null){
        return <div>...CARREGANDO...</div>
    }

    return(
    <div className={style.grid}>
        <div>
            <h2>Insights</h2>
            <div>
                <div className={style.card}>
                    <p>n° de Pagantes :</p>
                    <p>{totalPayers}</p>
                </div>
                <div className={style.card}>
                    <p>receita :</p>
                    <p>{revenue}</p>
                </div>
            </div>
        </div>

        <div>
            <h2>Registrar</h2>
            <NewPayer getDataFunction={getData}/>
        </div>

        <div>
            <h2>Registros</h2>
            <PayersList payersArray={payers} refreshData={getData}/>
            <DebtList debtsArray={debts} refreshData={getData}/>
        </div>
    </div>
    )
}