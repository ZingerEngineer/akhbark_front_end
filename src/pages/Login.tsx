import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import FormComponent from '../components/LoginSignupForm'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext, userDataContext } from '../App'
import { notifyMessage, notifyPromise } from '../utils/toasts'
import { ToastOptions } from 'react-toastify'

function Login() {
  const toastStyleConfig: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    pauseOnHover: false,
    theme: 'dark'
  }
  const navigate = useNavigate()
  const userState = useContext(userDataContext)
  const login = async (data: LoginSignupFormData) => {
    try {
      const res = (await notifyPromise(
        axios.post('http://localhost:8080/auth/login/', data),
        'Logging in...',
        'Logged in.',
        'Login failed.',
        toastStyleConfig
      )) as AxiosResponse
      const { userData } = res.data.userData
      userState?.setUserData(userData)
      localStorage.setItem('access_token', res.headers.authorization)
      navigate('/home')
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyMessage(error.response?.data.reason, toastStyleConfig)
        return
      }
      notifyMessage('Error happened', toastStyleConfig)
      return
    }
  }

  return (
    <div className="login-form-wrapper w-full flex justify-center items-center">
      <FormComponent
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
