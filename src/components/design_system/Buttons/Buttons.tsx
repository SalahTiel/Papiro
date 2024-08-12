import style from './Buttons.module.scss'

export function SubmitButton(prop: {text : string}){
    return <button className={style.submit} type="submit">{prop.text}</button>
}