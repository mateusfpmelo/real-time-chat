import './App.css'
import { useState, useEffect } from 'react'
import WarningComponent from './components/WarningComponent'
import { CiMail } from "react-icons/ci"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"


function App() {

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

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]))
    console.log('Criado:', localStorage.getItem('users'))
  }else{
    console.log('já estava criado:', localStorage.getItem('users'))
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
      setDivTextAlert('Por favor, insira um e-mail válido!')
      setDivAlert(true)
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
      setDivTextAlert('Nome não informado')
      setDivAlert(true)
      return
    }
    if(inputRegisterPsw !== inputConfirmRegisterPsw){
      setDivTextAlert('Senhas não coincidem!')
      setDivAlert(true)
      return
    }
    if(!inputRegisterPsw){
      setDivTextAlert('Senha não informada.')
      setDivAlert(true)
      return
    }
    if(!inputConfirmRegisterPsw){
      setDivTextAlert('Confirmação de senha não informada.')
      setDivAlert(true)
      return
    }
    if(!inputEmail){
      setDivTextAlert('E-mail não informado.')
      setDivAlert(true)
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
  }

  return (
    <div className='projectChatRealTime'>
      <div className='projectChatRealTime_title'><b>Olá,</b></div>
      <div className='projectChatRealTimeRowGap'>
        <CiMail />
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
            <MdDriveFileRenameOutline />
            <label>Digite seu nome:</label>
          </div>
          <input type='text' className='projectChatRealTime_input' placeholder='Exemplo: Carlos Eduardo' value={inputRegisterName} onChange={(e) => setInputRegisterName(e.target.value)}></input>
          
          <div className='projectChatRealTimeRowGap'>
            <RiLockPasswordLine />
            <label>Crie uma senha:</label>
          </div>
          <input type='password' className='projectChatRealTime_input' placeholder='Crie uma senha' value={inputRegisterPsw} onChange={(e) => setInputRegisterPsw(e.target.value)}></input>
          
          <div className='projectChatRealTimeRowGap'>
            <RiLockPasswordLine />
            <label>Digite novamente a senha:</label>
          </div>
          <input type='password' className='projectChatRealTime_input' placeholder='Digite novamente a senha' value={inputConfirmRegisterPsw} onChange={(e) => setInputConfirmRegisterPsw(e.target.value)}></input>
          <button onClick={handleNewUser}>Cadastrar</button>
        </>
      }
      {divContinueLogin &&
        <>
          <div className='projectChatRealTimeRowGap'>
            <RiLockPasswordLine />
            <label>Informe sua senha:</label>
          </div>
          <input type='password' className='projectChatRealTime_input' placeholder='Digite sua senha' value={inputPsw} onChange={(e) => setInputPsw(e.target.value)}></input>
          <button>Login</button>
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

export default App
