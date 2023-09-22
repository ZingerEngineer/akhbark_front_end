import axios, { AxiosResponse } from 'axios'
import FormComponent from '../components/LoginSignupForm'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'
import { notifyPromise } from '../utils/toasts'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userDataContext } from '../App'

function Register() {
  const userState = useContext(userDataContext)
  const navigate = useNavigate()
  const register = async (data: LoginSignupFormData) => {
    try {
      const res = (await notifyPromise(
        axios.post('http://localhost:8080/auth/register', data),
        'Registering...',
        'Registered.',
        'Register failed.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: false,
          pauseOnHover: false,
          theme: 'dark'
        }
      )) as AxiosResponse
      const { newUser } = res.data
      userState?.setUserData(newUser)
      localStorage.setItem('access_token', res.headers.authorization)
      navigate('/home')
    } catch (error) {
      return
    }
  }
  return (
    <div className="login-form-wrapper w-full flex justify-center items-center">
      <FormComponent
        formType="signup"
        formLabel="Register"
        email={true}
        password={true}
        userName={true}
        abortButtonLabel="Cancel"
        approveButtonLabel="Register"
        callBackDataFunction={register}
      />
    </div>
  )
}
export default Register
