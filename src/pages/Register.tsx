import axios from 'axios'
import FormComponent from '../components/LoginSignupForm'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'

function Register() {
  const register = async (data: LoginSignupFormData) => {
    await axios.post('http://localhost:8080/auth/register', data)
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
        formToastConfig={{
          formPendingMessage: 'Registering...',
          formSuccessMessage: 'Registered.',
          formErrorMessage: 'Error happened.'
        }}
        callBackDataFunction={register}
      />
    </div>
  )
}
export default Register
