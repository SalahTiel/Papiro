import { useEffect, useState } from "react"
import style from './DebtList.module.scss'


interface Item{
    id: string,
    name: string,
    value: number
}

interface PayersList{
    debtsArray : Item[],
    refreshData : () =>{}
}

export const DebtList : React.FC<PayersList> = ({debtsArray = [], refreshData}) => {
    const [payerData, setPayerData] = useState({id: '', name: ''})
    const [selectedPayer, setSelectedPayer] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [uid, setUid] = useState<string | null>(localStorage.getItem('uid'))

    async function getDebtPayer (payerId : string){
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
            getDebtPayer(selectedPayer)
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

    return (
        <div>
        <h3>Pagantes</h3>
        <ul>
            {debtsArray.map((item)=>(
                <li key={item.id} onClick={()=>{toggleModal(item.id)}}>{item.name}</li>
            ))}
        </ul>

        {modalOpen && (
            <div className={style.modal}>
                <p>{payerData.name}</p>
                <p onClick={()=>{toggleModal('nada')}}>FECHAR</p>
                <button onClick={()=>{deletePayer(selectedPayer)}}>delete</button>
                <button onClick={()=>{regularizePayer(selectedPayer)}}>regularizar pagamento</button>
            </div>
        )}
        </div>
    )
}