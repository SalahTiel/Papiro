import { useEffect, useState } from "react"
import style from "./Registry.module.scss"
import Image from "next/image"

interface Item{
    id: string,
    name: string,
    value: number,
    date: string,
    tel: string,
    email: string
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
    const [confirmDelete, setConfirmDelete] = useState(false)

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
        setConfirmDelete(false)
    }
    async function regularizePayer(payerdId : string) {
        const response = await fetch(`http://127.0.0.1:5001/papiro-77c3c/us-central1/helloWorld/regularizedebt/${uid}/query?payer=${payerdId}`)
        setModalOpen(!modalOpen)
        refreshData()
    }

    return(
        <div className={style.payersListWrapper}>
            <h3>Pagantes regulares</h3>
            {payersArray.length > 0 ? (<ul className={style.payersList}>
                {payersArray.map((item)=>(
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
            </ul>) :(
            <div className={style.emptyList}>
                <Image className={style.icon} src="/icon-empty.svg" width={0} height={0} alt="icone de vazio"/>
                <p>Lista de pagantes vazia</p>
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

                    {confirmDelete ? (
                        <div className={style.confirmDelete}>
                            <p>Por favor, confirme a exclusão do pagante</p>
                            <div className={style.deleteButtons}>
                                <button className={style.deleteButton} onClick={()=>{deletePayer(selectedPayer)}}>Deletar pagante</button>
                                <button className={style.cancelButton} onClick={()=>{setConfirmDelete(false)}}>Cancelar</button>
                            </div>
                        </div>                        
                    ): (
                        <div className={style.buttons}>
                            <button className={style.deleteButton} onClick={()=>{setConfirmDelete(true)}}>Deletar pagante</button>
                            <button className={style.regularizeButton} onClick={()=>{regularizePayer(selectedPayer)}}>Adiantar pagamento</button>
                        </div>
                    )}
                    
                </div>
            )}
        </div>
    )
}