import axios from 'axios'
import LoginSignupForm from '../components/LoginSignupForm'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext, userDataContext } from '../App'

interface UserData {
  userName: string
  email: string
  avatar: string
  role: string
}

function Login() {
  const naivgate = useNavigate()
  const theme = useContext(ThemeContext)
  const [userData, setUserData] = useState()
  const login = async (data: LoginSignupFormData) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login/', data)
      const { userData, token } = res.data.receivedData

      localStorage.setItem('accessToken', token)
      naivgate('/home')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="login-form-wrapper w-full flex justify-center items-center">
      <LoginSignupForm
        formType="login"
        formLabel="Login"
        email={true}
        password={true}
        abortButtonLabel="Cancel"
        approveButtonLabel="Login"
        callBackDataFunction={login}
      />
    </div>
  )
}
export default Login
