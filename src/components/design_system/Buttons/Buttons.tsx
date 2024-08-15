import style from './Buttons.module.scss'

interface button{
    text: string;
    buttonType: string
}

export const SubmitButton : React.FC<button> = ({text, buttonType}) => {
    return <button className={`${style.submit} ${style[buttonType]}`} type="submit">{text}</button>
}