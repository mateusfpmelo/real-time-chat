import './Home.css'
import { useState, useEffect } from 'react'
import WarningComponent from '../../components/WarningComponent'
import { useNavigate } from 'react-router-dom'
import { MdDriveFileRenameOutline } from "react-icons/md"
import { MdDescription } from "react-icons/md"
import { MdPublic } from "react-icons/md"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { BsPersonUp } from "react-icons/bs"

const Home = () => {
    const [showUserName, setShowUserName] = useState(null)
    const [showUserEmail, setShowUserEmail] = useState(null)
    const [chatRoomsSelected, setChatRoomsSelected] = useState(null)
    const [contentChatRooms, setContentChatRooms] = useState([])
    const [divShowInputChatRoom, setDivShowInputChatRoom] = useState(false)
    const [inputMessageChat, setInputMessageChat] = useState(null)
    const [showChatSelected, setShowChatSelected] = useState(false)
    const [inputNameChatRoom, setInputNameChatRoom] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [inputSelectedAccess, setInputSelectedAccess] = useState(null)
    const [divAlert, setDivAlert] = useState(false)
    const [divTextAlert, setDivTextAlert] = useState(null)
    const [inputDescriptionChatRoom, setInputDescriptionChatRoom] = useState(null)
    const navigate = useNavigate()
    const usersString = localStorage.getItem('users')
    const users = JSON.parse(usersString)
    const userLogged = localStorage.getItem('userLogged')

    useEffect(() => {
        console.log('chatRoomsSelected foi alterado:', chatRoomsSelected)
    }, [chatRoomsSelected])

    useEffect(() => {
        if (!userLogged) {
            navigate('/')
        } else {
            const loggedUser = users.find(user => user.email === userLogged)
            if (loggedUser) {
                setShowUserName(loggedUser.nome)
                setShowUserEmail(loggedUser.email)
            }
        }
    }, [userLogged, navigate, users])

    
    const updateChatRooms = () => {
        const chatRooms = JSON.parse(localStorage.getItem('chatRooms'))
        if (chatRooms) {
            setContentChatRooms(chatRooms)
        }
    }

    
    useEffect(() => {
        console.log(chatRoomsSelected)
    }, [chatRoomsSelected])

    useEffect(() => {
        const chatRoomsSelected = JSON.parse(localStorage.getItem('chatRooms'))
        console.log('useEffect chatroomsSelected:', chatRoomsSelected)
        //const updatedRoom = chatRooms.find(room => room.name === roomName)
        //setChatRoomsSelected(updatedRoom)
    }, [])

    useEffect(() => {
        updateChatRooms()

    
        const intervalId = setInterval(() => {
            updateChatRooms()
        }, 5000)
    
        return () => clearInterval(intervalId)
    }, [])
    
    useEffect(() => {

        if (divAlert) {
        const timeoutId = setTimeout(() => {
            setDivAlert(false)
            setDivTextAlert(null)
        }, 3000)

    return () => clearTimeout(timeoutId)
    }
    }, [divAlert])
    

    
    const handleShowNewChatRoom = () => {
        setDivShowInputChatRoom(!divShowInputChatRoom)
        setInputNameChatRoom('')
        setInputDescriptionChatRoom('')
        setInputSelectedAccess('')
    }
    const handleAccessChange = (event) => {
        setInputSelectedAccess(event.target.value)
    }


    const handleNewChatRoom = () => {
        if(!inputNameChatRoom){
            setDivTextAlert('Nome da sala não informado.')
            setDivAlert(true)
            return
        }
        if(!inputDescriptionChatRoom){
            setDivTextAlert('Descrição da sala não informada.')
            setDivAlert(true)
            return
        }
        if(!inputSelectedAccess){
            setDivTextAlert('Tipo de acesso não selecionado.')
            setDivAlert(true)
            return
        }
        
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms'))

        if (!chatRooms) {
            chatRooms = []
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms))
        }
        let inputEmailAccessList = []
        if (inputSelectedAccess === 'private') {
            inputEmailAccessList.push(showUserEmail)
        }
        const newChatRoom = {
            name: inputNameChatRoom,
            description: inputDescriptionChatRoom,
            accessType: inputSelectedAccess,
            emailAccessList: inputEmailAccessList
        }

        chatRooms.push(newChatRoom)

        localStorage.setItem('chatRooms', JSON.stringify(chatRooms))

        setDivTextAlert('Sala de bate-papo criada com sucesso.')
        setDivAlert(true)

        setInputNameChatRoom('')
        setInputDescriptionChatRoom('')
        setInputSelectedAccess('')

        let chatRoomsUpdated = JSON.parse(localStorage.getItem('chatRooms'))
        console.log('Chat Rooms:', chatRoomsUpdated)
        updateChatRooms()


    }

    const handleChatSelected = (roomName) =>{
        setChatRoomsSelected('')
        setSelectedRoom(roomName)
        setShowChatSelected(!showChatSelected)
        setInputMessageChat('')
        console.log('1')
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms'))
        const updatedRoom = chatRooms.find(room => room.name === roomName)
        setChatRoomsSelected(updatedRoom)
        console.log('100')
    }

    const handleSendMessage = (roomName) => {
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms'))
        const room = chatRooms.find(room => room.name === roomName)
        if (room) {
            const newMessage = {
                message: inputMessageChat,
                send_at: new Date().toLocaleString(),
                send_by: showUserEmail
            }
            // Verifique se a propriedade historyChats já existe na sala
            if (!room.historyChats) {
                room.historyChats = [newMessage]
            } else {
                room.historyChats.push(newMessage)
            }
            setTimeout(() => {
                const automaticMessage = {
                    message: 'Simulação de conversa',
                    send_at: new Date().toLocaleString(), 
                    send_by: 'automatic@automatic.com'
                }
                room.historyChats.push(automaticMessage)
                localStorage.setItem('chatRooms', JSON.stringify(chatRooms))
                const updatedRoom = chatRooms.find(room => room.name === roomName)
                setChatRoomsSelected(updatedRoom)
            }, 3000)
            setInputMessageChat('')
        }
    }

    const handleLogout = () => {
        navigate('/logout')
    }
    return(
        <div className='projectChatRealTimeHome'>
            <>
                <div className='projectChatRealTimeHome_title'>
                    <div className='projectChatRealTimeHome_textYellowNotPat'>Olá, </div>
                    {showUserName &&<div>  {showUserName.toUpperCase()}!</div>}
                    
                </div>
                {contentChatRooms !== '' &&
                    <>
                        <br/>
                        <label><b className='projectChatRealTimeHome_textYellow'>S A L A S</b></label>
                        <br/>
                    </>
                }
                {contentChatRooms && contentChatRooms.map((room, index) => (
                        <div key={index} className='projectChatRealTimeHome_rooms'>
                            {room.accessType === 'public' || (room.accessType === 'private' && room.emailAccessList.includes(userLogged)) ? (
                                <>
                                    <div className='projectChatRealTimeHome_roomsItem'>
                                        {room.accessType === 'private' ? <MdOutlinePrivacyTip size={24} /> : <MdPublic size={24} />}
                                        <div>{room.name.toUpperCase()} </div>
                                        
                                    </div>
                                    <div className='projectChatRealTimeHome_roomsDescription'>Descrição: {room.description}</div>
                                    
                                    <div className={'projectChatRealTimeHome_roomsButtonAcess'} onClick={() => handleChatSelected(room.name)}>{showChatSelected && selectedRoom === room.name ? 'Ocultar' : 'Acessar'}</div>
                                    <br/>
                                    {showChatSelected && selectedRoom === room.name && 
                                        <>
                                            {chatRoomsSelected && chatRoomsSelected.historyChats && chatRoomsSelected.historyChats.reverse().map((message, index) => (
                                                <div className='projectChatRealTimeHome_roomsDiv'>
                                                    <div key={index} className='projectChatRealTimeHome_roomsDivHistoryChat' >
                                                        <div><BsPersonUp size={24} /> {message.send_by} ({message.send_at})</div>
                                                    </div>
                                                    <div className='projectChatRealTimeHome_roomsDescription'>{message.message}</div>
                                                </div>
                                            ))}
                                            <div className='projectChatRealTimeHome_roomsDivSendMessage'>
                                                <input type='text' placeholder='Digite uma mensagem' className='projectChatRealTimeHome_roomsDivSendMessageInput' value={inputMessageChat} onChange={(e) => setInputMessageChat(e.target.value)}></input>
                                                <div className='projectChatRealTimeHome_roomsButtonAcessSend' onClick={() => handleSendMessage(room.name)}>Enviar</div>
                                            </div>
                                        </>
                                    }
                                    <br/>
                                    
                                </>
                            ) : null}
                        </div>
                ))}
                
                <br/>
                <button onClick={handleShowNewChatRoom}>Nova Sala</button>
                <br/>
                {divShowInputChatRoom &&
                    <>
                        <br/>
                        <label><b className='projectChatRealTimeHome_textYellow'>C A D A S T R O (S A L A)</b></label>
                        <br/>
                        <div className='projectChatRealTimeHomeRowGap'>
                            <MdDriveFileRenameOutline size={24} />
                            <label>Digite o nome da sala:</label>
                        </div>
                        <input type='text' placeholder='Nome' value={inputNameChatRoom} onChange={(e) => setInputNameChatRoom(e.target.value)}></input>

                        <div className='projectChatRealTimeHomeRowGap'>
                            <MdDescription size={24} />
                            <label>Digite a descrição da sala:</label>
                        </div>
                        <input type='text' placeholder='Descrição' value={inputDescriptionChatRoom} onChange={(e) => setInputDescriptionChatRoom(e.target.value)}></input>

                        <div className='projectChatRealTimeHomeRowGap'>
                            <MdOutlinePrivacyTip size={24} />
                            <label>Selecione a privacidade da sala:</label>
                        </div>
                        <div>*salas privadas só são acessadas com liberação do criador da sala.</div>
                        <select id="access-select" value={inputSelectedAccess} onChange={handleAccessChange}>
                            <option value="">Selecione</option>
                            <option value="public">Pública</option>
                            <option value="private">Privada</option>
                        </select>
                        <button onClick={handleNewChatRoom}>Criar Sala</button>
                        <br />
                        <br />
                    </>
                }
                {divAlert && 
                    <>
                        <WarningComponent InfoText={divTextAlert}/>
                    </>
                }
            </>
            <div className='projectChatRealTimeHomeSecondButton' onClick={handleLogout}>Logout</div>
        </div>
    )
}
export default Home