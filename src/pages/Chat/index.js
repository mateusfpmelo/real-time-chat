import './Chat.css'
import { useState, useEffect } from 'react'
import WarningComponent from '../../components/WarningComponent'
import { useNavigate } from 'react-router-dom'


const Chat = () => {
    const navigate = useNavigate()
    const userLogged = localStorage.getItem('userLogged')

    useEffect(() => {
        if (!userLogged) {
            console.log('!userLogged')
            navigate('/')
        }
    }, [userLogged, navigate])

    return(
        <div className='projectChatRealTime'>Olá mundo, chat page!</div>
    )
}
export default Chat