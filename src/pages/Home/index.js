import './Home.css'
import { useState, useEffect } from 'react'
import WarningComponent from '../../components/WarningComponent'
import { useNavigate } from 'react-router-dom'
import { MdDriveFileRenameOutline } from "react-icons/md"
import { MdDescription } from "react-icons/md"
import { MdOutlinePrivacyTip } from "react-icons/md"

const Home = () => {
    const [showUserName, setShowUserName] = useState(null)
    const [showUserEmail, setShowUserEmail] = useState(null)
    const [divShowInputChatRoom, setDivShowInputChatRoom] = useState(false)
    const [inputNameChatRoom, setInputNameChatRoom] = useState(null)
    const [inputSelectedAccess, setInputSelectedAccess] = useState(null)
    const [divAlert, setDivAlert] = useState(false)
    const [divTextAlert, setDivTextAlert] = useState(null)
    const [inputDescriptionChatRoom, setInputDescriptionChatRoom] = useState(null)
    const navigate = useNavigate()
    const usersString = localStorage.getItem('users')
    const users = JSON.parse(usersString)
    const userLogged = localStorage.getItem('userLogged')

    useEffect(() => {
        console.log('Valor de showUserName:', showUserName)
    }, [showUserName])
    
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

    }
    return(
        <div className='projectChatRealTimeHome'>
            <div className='projectChatRealTimeHome_title'>
                <div className='projectChatRealTimeHome_textYellow'>Olá, </div>
                {showUserName &&<div>  {showUserName.toUpperCase()}!</div>}
                
            </div>
            <button onClick={handleShowNewChatRoom}>Nova Sala</button>
            {divShowInputChatRoom &&
                <>
                    <br/>
                    <label><b className='projectChatRealTimeHome_textYellow'>C A D A S T R O (S A L A)</b></label>
                    <br/>
                    <div className='projectChatRealTimeHomeRowGap'>
                        <MdDriveFileRenameOutline />
                        <label>Digite o nome da sala:</label>
                    </div>
                    <input type='text' placeholder='Nome' value={inputNameChatRoom} onChange={(e) => setInputNameChatRoom(e.target.value)}></input>

                    <div className='projectChatRealTimeHomeRowGap'>
                        <MdDescription />
                        <label>Digite a descrição da sala:</label>
                    </div>
                    <input type='text' placeholder='Descrição' value={inputDescriptionChatRoom} onChange={(e) => setInputDescriptionChatRoom(e.target.value)}></input>

                    <div className='projectChatRealTimeHomeRowGap'>
                        <MdOutlinePrivacyTip />
                        <label>Selecione a privacidade da sala:</label>
                    </div>
                    <select id="access-select" value={inputSelectedAccess} onChange={handleAccessChange}>
                        <option value="">Selecione</option>
                        <option value="public">Pública</option>
                        <option value="private">Privada</option>
                    </select>
                    <button onClick={handleNewChatRoom}>Criar Sala</button>
                </>
            }
            {divAlert && 
                <>
                    <WarningComponent InfoText={divTextAlert}/>
                </>
            }
        </div>
    )
}
export default Home