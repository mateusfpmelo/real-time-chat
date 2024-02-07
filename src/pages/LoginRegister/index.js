import './LoginRegister.css'
import { useState, useEffect } from 'react'
import WarningComponent from '../../components/WarningComponent'
import { CiMail } from "react-icons/ci"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'



const LoginRegister = () => {

    const [inputEmail, setInputEmail] = useState(null)
    const [inputRegisterName, setInputRegisterName] = useState(null)
    const [inputRegisterPsw, setInputRegisterPsw] = useState(null)
    const [inputConfirmRegisterPsw, setInputConfirmRegisterPsw] = useState(null)
    const [inputPsw, setInputPsw] = useState(null)
    const [divContinueRegister, setDivContinueRegister] = useState(false)
    const [divContinueLogin, setDivContinueLogin] = useState(false)
    const [divAlert, setDivAlert] = useState(false)
    const [divTextAlert, setDivTextAlert] = useState(null)
    const [buttonContinuar, setButtonContinuar] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const navigate = useNavigate()
    
  
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]))
      //console.log('Criado:', localStorage.getItem('users'))
    }
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
    const showAlert = (message) => {
      setDivTextAlert(message)
      setDivAlert(true)
  }
  
  
    useEffect(() => {
  
      if (divAlert) {
      const timeoutId = setTimeout(() => {
          setDivAlert(false)
          setDivTextAlert(null)
      }, 3000)
  
      return () => clearTimeout(timeoutId)
      }
    }, [divAlert])
  
    const clearLocalStorage = () => {
      localStorage.removeItem('users')
      localStorage.removeItem('chatRooms')
      setButtonContinuar(true)
      setDivContinueLogin(false)
      setDivContinueRegister(false)
      setInputEmail('')
      setInputRegisterName('')
      setInputRegisterPsw('')
      setInputConfirmRegisterPsw('')
      setInputPsw('')
    }

    const handleContinue = () => {
      if (!isValidEmail(inputEmail)){
        showAlert('Por favor, insira um e-mail válido!')
        return
      }
      const users = JSON.parse(localStorage.getItem('users'))
      const foundUser = users.find(user => user.email === inputEmail)
      if (foundUser) {
        setDivContinueLogin(true)
        setDivContinueRegister(false)
        setButtonContinuar(false)
      }else{
        setDivContinueLogin(false)
        setDivContinueRegister(true)
        setButtonContinuar(false)
      }
    }
  
    const handleNewUser = () => {
      if(!inputRegisterName){
        showAlert('Nome não informado')
        return
      }
      if(inputRegisterPsw !== inputConfirmRegisterPsw){
        showAlert('Senhas não coincidem!')
        return
      }
      if(!inputRegisterPsw){
        showAlert('Senha não informada.')
        return
      }
      if(!inputConfirmRegisterPsw){
        showAlert('Confirmação de senha não informada.')
        return
      }
      if(!inputEmail){
        showAlert('E-mail não informado.')
        return
      }
      const newUser = {
        nome: inputRegisterName,
        email: inputEmail,
        senha: inputRegisterPsw
      }
      const users = JSON.parse(localStorage.getItem('users'))
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      console.log('users apos a inserção:', users)
      setButtonContinuar(true)
      setDivContinueRegister(false)
      setInputEmail('')
      showAlert('Cadastrado com sucesso!')
    }
  
    const ConfirmEqualPsw =  (e) => {
      setInputConfirmRegisterPsw(e.target.value)

      if(inputRegisterPsw === e.target.value){
          setPasswordMatch(true)
      }else{
          setPasswordMatch(false)
      }

    }

    
    const handleLogin = () => {
      if(!inputEmail){
        showAlert('E-mail não informado.')
        return
      }
      if(!inputPsw){
        showAlert('Senha não informada.')
        return
      }

      const users = JSON.parse(localStorage.getItem('users'))
      const user = users.find(user => user.email === inputEmail)

      if (!user) {
        showAlert('E-mail não encontrado.')
        setDivAlert(true)
        return
      }

      if (user.senha !== inputPsw) {
        showAlert('Senha incorreta.')
        return
      }
      localStorage.setItem('userLogged', inputEmail)
      navigate('/home')

    } 




    return (
      <div className='projectChatRealTime'>
        <div className='projectChatRealTime_title'><b>Olá,</b></div>
        <div className='projectChatRealTimeRowGap'>
          <CiMail size={24} />
          <label>Informe seu e-mail:</label>
        </div>
        <input type='text' className='projectChatRealTime_input' placeholder='Digite seu e-mail' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}></input>
        {buttonContinuar && 
          <>
            <button onClick={handleContinue}>Continuar</button>
          </>
        }
        {divContinueRegister && 
          <>
            <div className='projectChatRealTimeRowGap'>
              <MdDriveFileRenameOutline size={24} />
              <label>Digite seu nome:</label>
            </div>
            <input type='text' className='projectChatRealTime_input' placeholder='Exemplo: Carlos Eduardo' value={inputRegisterName} onChange={(e) => setInputRegisterName(e.target.value)}></input>
            
            <div className='projectChatRealTimeRowGap'>
              <RiLockPasswordLine size={24} />
              <label>Crie uma senha:</label>
            </div>
            <input type='password' className='projectChatRealTime_input' placeholder='Crie uma senha' value={inputRegisterPsw} onChange={(e) => setInputRegisterPsw(e.target.value)}></input>
            
            <div className='projectChatRealTimeRowGap'>
              <RiLockPasswordLine size={24} />
              <label>Digite novamente a senha:</label>
            </div>
            <input type='password' className='projectChatRealTime_input' placeholder='Digite novamente a senha' value={inputConfirmRegisterPsw} onChange={ConfirmEqualPsw}></input>
            
            {!passwordMatch && 
              <div className='projectChatRealTime_matchPsw'>
                Senhas não conferem!
              </div>
            }
            <button onClick={handleNewUser}>Cadastrar</button>
          </>
        }
        {divContinueLogin &&
          <>
            <div className='projectChatRealTimeRowGap'>
              <RiLockPasswordLine size={24} />
              <label>Informe sua senha:</label>
            </div>
            <input type='password' className='projectChatRealTime_input' placeholder='Digite sua senha' value={inputPsw} onChange={(e) => setInputPsw(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
          </>
        }
        {divAlert && 
          <>
            <WarningComponent InfoText={divTextAlert}/>
          </>
        }
        <div className='projectChatRealTime_clearStorage' onClick={clearLocalStorage}>Clear Storage</div>
      </div>
    )

}

export default LoginRegister