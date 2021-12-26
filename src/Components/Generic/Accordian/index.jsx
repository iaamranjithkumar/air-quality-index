import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './index.css'
export default function Accordian(props){
    const [isActive,setActive] = useState(false)
    return(<div className="accordian-item">
        <div className="accordian-title" onClick={()=>setActive(!isActive)}>
            <div className="accordian-title-text">{props.title}</div>
            {isActive&&<FontAwesomeIcon icon={faMinusSquare} />}
            {!isActive&&<FontAwesomeIcon icon={faPlusSquare} />}
        </div>
        {isActive &&<div className={`accordian-content`}>{props.content}</div>}
    </div>)
}