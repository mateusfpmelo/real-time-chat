import './Home.css'
import { useState, useEffect } from 'react'
import WarningComponent from '../../components/WarningComponent'
import { useNavigate } from 'react-router-dom'
import { MdDriveFileRenameOutline } from "react-icons/md"
import { MdDescription } from "react-icons/md"
import { MdPublic } from "react-icons/md"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { BsPersonUp } from "react-icons/bs"
import iconLoading from '../../img/loadingicon.png'

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
    const [loadingSendMsg, setLoadingSendMsg] = useState(false)
    const [showDivInvite, setShowDivInvite] = useState(false)
    const [inputInviteRoom, setInputInviteRoom] = useState(null)
    const [divAlert, setDivAlert] = useState(false)
    const [divTextAlert, setDivTextAlert] = useState(null)
    const [inputDescriptionChatRoom, setInputDescriptionChatRoom] = useState(null)
    const navigate = useNavigate()
    const usersString = localStorage.getItem('users')
    const users = JSON.parse(usersString)
    const userLogged = localStorage.getItem('userLogged')

    useEffect(() => {
        console.log('loadingSendMsg foi alterado:', loadingSendMsg)
    }, [loadingSendMsg])

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

    const showAlert = (message) => {
        setDivTextAlert(message)
        setDivAlert(true)
    }
    
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
            showAlert('Nome da sala não informado.')
            return
        }
        if(!inputDescriptionChatRoom){
            showAlert('Descrição da sala não informada.')
            return
        }
        if(!inputSelectedAccess){
            showAlert('Tipo de acesso não selecionado.')
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
        showAlert('Sala de bate-papo criada com sucesso.')

        setInputNameChatRoom('')
        setInputDescriptionChatRoom('')
        setInputSelectedAccess('')

        let chatRoomsUpdated = JSON.parse(localStorage.getItem('chatRooms'))
        console.log('Chat Rooms:', chatRoomsUpdated)
        updateChatRooms()
        setDivShowInputChatRoom(false)


    }

    const handleChatSelected = (roomName) =>{
        setChatRoomsSelected('')
        setSelectedRoom(roomName)
        setShowChatSelected(!showChatSelected)
        setInputMessageChat('')
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms'))
        const updatedRoom = chatRooms.find(room => room.name === roomName)
        setChatRoomsSelected(updatedRoom)
    }

    const handleMessageAutomatic = (roomName) => {
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms'))
        const room = chatRooms.find(room => room.name === roomName)
        const automaticMessage = {
            message: 'mensagem automática, <3',
            send_at: new Date().toLocaleString(), 
            send_by: 'automatic@automatic.com'
        }
        room.historyChats.push(automaticMessage)
        localStorage.setItem('chatRooms', JSON.stringify(chatRooms))
        const updatedRoom = chatRooms.find(room => room.name === roomName)
        setChatRoomsSelected(updatedRoom)
    }

    const handleSendMessage = (roomName) => {
        setLoadingSendMsg(true)
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
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms))
            const updatedRoom = chatRooms.find(room => room.name === roomName)
            setChatRoomsSelected(updatedRoom)
            setInputMessageChat('')
            setTimeout(() => {
                handleMessageAutomatic(room.name)
                setLoadingSendMsg(false)
            }, 5000)
            setInputMessageChat('')
        }
    }

    const handleLogout = () => {
        navigate('/logout')
    }

    const handleShowDivInvite = () => {
        setShowDivInvite(!showDivInvite)
    }

    const handleInsertAccess = (roomName, newEmail) => {
        let chatRooms = JSON.parse(localStorage.getItem('chatRooms')) || []

        const roomIndex = chatRooms.findIndex(room => room.name === roomName)
        if (roomIndex !== -1) {
            chatRooms[roomIndex].emailAccessList.push(newEmail)

            localStorage.setItem('chatRooms', JSON.stringify(chatRooms))
            showAlert('Inserido com sucesso.')
            setInputInviteRoom('')
            setShowChatSelected(false)
            return true
        }
        showAlert('Sala não encontrada.')
        return false
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
                                    {showChatSelected && room.accessType !== 'public' && 
                                        <>
                                                <div onClick={handleShowDivInvite} className='projectChatRealTimeHome_roomsButtonInvite'>{showDivInvite ? 'Ocultar' : 'Convidar'}</div>
                                                
                                                {showDivInvite  && 
                                                    <>
                                                        <div><b>C O N V I T E - SALA PRIVADA</b></div>
                                                        <input type='text' placeholder='Digite um e-mail'  value={inputInviteRoom} onChange={(e) => setInputInviteRoom(e.target.value)}></input>
                                                        <div className='projectChatRealTimeHome_roomsButtonAcessSend' onClick={() => handleInsertAccess(room.name, inputInviteRoom)}>Convidar</div>
                                                    </>
                                                }   
                                                
                                        </>
                                    }
                                    {showChatSelected && selectedRoom === room.name && 
                                        <div className='projectChatRealTimeHome_roomsDivMaster'>
                                            {chatRoomsSelected && chatRoomsSelected.historyChats && chatRoomsSelected.historyChats
                                                .map((message, index) => (
                                                    <div className='projectChatRealTimeHome_roomsDiv' key={index}>
                                                        <div className='projectChatRealTimeHome_roomsDivHistoryChat'>
                                                            <div className='projectChatRealTimeHome_row'>
                                                                <BsPersonUp size={24} />
                                                                <div className='projectChatRealTimeHome_roomsDescription'>{message.send_by}</div>
                                                            </div>
                                                            <div className='projectChatRealTimeHome_gray'>({message.send_at})</div>
                                                        </div>
                                                        <div className='projectChatRealTimeHome_msg'><b>{message.message}</b></div>
                                                    </div>
                                            ))}
                                        </div>
                                    }
                                    {showChatSelected && selectedRoom === room.name && 
                                        <>
                                            <div className='projectChatRealTimeHome_roomsDivSendMessage'>
                                                <input type='text' placeholder='Digite uma mensagem' disabled={loadingSendMsg}  className='projectChatRealTimeHome_roomsDivSendMessageInput' value={inputMessageChat} onChange={(e) => setInputMessageChat(e.target.value)}></input>
                                                {loadingSendMsg ? (
                                                    <img src={iconLoading} alt={'Imagem de carregamento'} className='loadingIcon' />
                                                ) : (
                                                    <div className='projectChatRealTimeHome_roomsButtonAcessSend' onClick={() => handleSendMessage(room.name)}>Enviar</div>
                                                )}
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