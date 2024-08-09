import { useEffect, useState } from "react"
import style from "./Registry.module.scss"

interface Item{
    id: string,
    name: string,
    value: number
}

interface PayersList{
    payersArray : Item[],
    refreshData : () =>{}
}

export const PayersList : React.FC<PayersList> = ({payersArray = [], refreshData}) => {
    const [selectedPayer, setSelectedPayer] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [payerData, setPayerData] = useState({id: '', name: '', value: '', date: '', email: '', tel: ''})
    const [uid, setUid] = useState<string | null>(localStorage.getItem('uid'))

    async function getPayersList (payerId : string){
        if(uid){
            const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}/query?payer=${payerId}`)
            const data = await response.json()
            setPayerData(data)
        }
    }
    async function toggleModal(payerId: string){
        setSelectedPayer(payerId)
        setModalOpen(!modalOpen)
    }

    useEffect(()=>{
        if(modalOpen){
            getPayersList(selectedPayer)
        }
    }, [modalOpen])

    async function deletePayer(payerId : string){
        const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/${uid}/query?payer=${payerId}`,{
            method: 'DELETE',
        })
        setModalOpen(!modalOpen)
        refreshData()
    }
    async function regularizePayer(payerdId : string) {
        const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/regularizedebt/${uid}/query?payer=${payerdId}`)
        setModalOpen(!modalOpen)
        refreshData()
    }

    return(
        <div>
            <h3>Pagantes</h3>
            <ul>
                {payersArray.map((item)=>(
                    <li key={item.id} onClick={()=>{toggleModal(item.id)}}>{item.name}</li>
                ))}
            </ul>

            {modalOpen && (
                <div className={style.modal}>
                    <p>{payerData.name}</p>
                    <p>{payerData.value}</p>
                    <p>{payerData.date}</p>
                    <p>{payerData.email}</p>
                    <p>{payerData.tel}</p>
                    <p onClick={()=>{toggleModal('nada')}}>FECHAR</p>
                    <button onClick={()=>{deletePayer(selectedPayer)}}>delete</button>
                    <button onClick={()=>{regularizePayer(selectedPayer)}}>adiantar pagamento</button>
                </div>
            )}
        </div>
    )
}