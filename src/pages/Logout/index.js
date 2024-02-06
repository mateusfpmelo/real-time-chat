import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('userLogged')
    navigate('/')
  }, [navigate])

  return (
    <div className='projectChatRealTime'>
      <h2>Fazendo logout...</h2>
    </div>
  )
}

export default Logout