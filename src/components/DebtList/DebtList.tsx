import { useEffect, useState } from "react"
import style from './DebtList.module.scss'
import Image from "next/image"
import { PayersList } from "../Registry/Registry"


interface Item{
    id: string,
    name: string,
    value: number,
    date: string,
    tel: string,
    email: string
}

interface PayersList{
    debtsArray : Item[],
    refreshData : () =>{}
}

export const DebtList : React.FC<PayersList> = ({debtsArray = [], refreshData}) => {
    const [payerData, setPayerData] = useState({id: '', name: '', value: '', date: '', email: '', tel: ''})
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
        <div className={style.payersListWrapper}>
            <h3>Pagantes em débito</h3>
            {debtsArray.length > 0 ? (<ul className={style.payersList}>
                {debtsArray.map((item)=>(
                    <li key={item.id} onClick={()=>{toggleModal(item.id)}}>
                        <div>
                            <Image className={style.icon} src="/icon-person.svg" width={0} height={0} alt="icone de uma pessoa"/>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <Image className={style.icon} src="/icon-calendar.svg" width={0} height={0} alt="icone de um calendário"/>
                            <p>{item.date}</p>
                        </div>
                        <div>
                            <Image className={style.icon} src="/icon-coin.svg" width={0} height={0} alt="icone de uma moeda"/>
                            <p>{item.value}</p>
                        </div>
                    </li>
                ))}
            </ul>) : (
            <div className={style.emptyList}>
                <Image className={style.icon} src="/icon-checkbox.svg" width={0} height={0} alt="icone de uma checkbox"/>
                <p>Não há pagantes em débito</p>
            </div>
            )}

{modalOpen && (
                <div className={style.modal}>
                    <Image onClick={()=>{toggleModal('nada')}} className={style.closeIcon} src="/icon-close.svg" width={0} height={0} alt="icone de fechar aba"/>
                    <ul> 
                        <li>
                            <Image className={style.icon} src="/icon-person.svg" width={0} height={0} alt="icone de uma pessoa"/>
                            <p>{payerData.name}</p>
                        </li>

                        <li>
                            <Image className={style.icon} src="/icon-coin.svg" width={0} height={0} alt="icone de uma moeda"/>
                            <p>{payerData.value}</p>
                        </li>

                        <li>
                            <Image className={style.icon} src="/icon-calendar.svg" width={0} height={0} alt="icone de um calendário"/>
                            <p>{payerData.date}</p>
                        </li>

                        {payerData.email && 
                        <li>
                            <Image className={style.icon} src="/icon-email.svg" width={0} height={0} alt="icone de uma carta"/>
                            <p>{payerData.email}</p>
                        </li>
                        }

                        {payerData.email && 
                        <li>
                            <Image className={style.icon} src="/icon-phone.svg" width={0} height={0} alt="icone de um telefone"/>
                            <p>{payerData.tel}</p>
                        </li>
                        }
                    </ul>

                    <div className={style.buttons}>
                        <button className={style.deleteButton} onClick={()=>{deletePayer(selectedPayer)}}>Deletar pagante</button>
                        <button className={style.regularizeButton} onClick={()=>{regularizePayer(selectedPayer)}}>Regularizar pagamento</button>
                    </div>
                </div>
            )}
        </div>
    )
}