import { NewPayer } from "../Forms/Forms"
import { PayersList } from "../Registry/Registry"
import { DebtList } from "../DebtList/DebtList"
import Image from "next/image"

import { useState, useEffect } from "react"

import  style  from "./Overview.module.scss"

export default function Overview () {
    const [totalPayers, setTotalPayers] = useState()
    const [revenue, setRevenue] = useState()
    const [payers, setPayers] = useState([])
    const [debts, setDebts] = useState([])
    const [uid, setUid] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    async function getData () {
        if(uid){
            const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}`)
            const data = await response.json()
            setPayers(data.payersData)
            setDebts(data.debtlist)
            setTotalPayers(data.insightsData.totalPayers)
            const formatedRevenue = data.insightsData.revenue.toFixed(2)
            setRevenue(formatedRevenue)
            
        }
    }
        
    useEffect(()=>{
        setUid(localStorage.getItem('uid'))
    })

    useEffect(() =>{
        const toggleLoadingStatus = async () => {
            const response = await getData()
            setLoading(false)
        }
        toggleLoadingStatus()
    },[])


    if(loading){
        return <div>Carregando...</div>
    }

    return(
        <div className={style.grid}>
            <div className={style.insightsWrapper}>
                <h2>Insights</h2>
                <div className={style.cardsWrapper}>
                    <div className={style.card}>
                        <p>n° de Pagantes</p>
                        <div className={style.cardContent}>
                            <Image src="/icon-person-dark.svg" width={0} height={0} alt="icone de uma pessoa"/>
                            <p>{totalPayers}</p>
                        </div>
                    </div>
                    <div className={style.card}>
                        <p>Receita</p>
                        <div className={style.cardContent}>
                            <Image src="/icon-coin-dark.svg" width={0} height={0} alt="icone de uma cifrão"/>
                            <p className={style.revenue}><span>$ </span>{revenue}</p>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className={style.registerWrapper}>
                <h2>Registrar</h2>
                <NewPayer getDataFunction={getData}/>
            </div>

            <div className={style.registrationWrapper}>
                <h2>Registros</h2>
                <div className={style.listWrapper}>
                    <PayersList payersArray={payers} refreshData={getData}/>
                    <DebtList debtsArray={debts} refreshData={getData}/>
                </div>
            </div>
        </div>
    )
}
