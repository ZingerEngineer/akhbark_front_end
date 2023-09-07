import axios from 'axios'
import LoginSignupForm from '../components/LoginSignupForm'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'

function Login() {
  const login = async (data: LoginSignupFormData) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login/', data)
      const { userData, token } = res.data.receivedData
      localStorage.setItem('accessToken', token)
      console.log(userData)
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
