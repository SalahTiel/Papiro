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
        const gambiarra = async () => {
            const response = await getData()
            setLoading(false)
        }
        gambiarra()
    },[])

    useEffect(()=>{}, [])

    if(loading){
        return <div>CORONÉR AIIIII, IAAAAA</div>
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
