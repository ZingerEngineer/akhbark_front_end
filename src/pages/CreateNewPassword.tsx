import { useCallback, useLayoutEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { notifyMessage, notifyPromise } from '../utils/toasts'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState<string>()
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')
  const navigate = useNavigate()
  const { reset_password_token } = useParams()
  const tokenValidation = useCallback(async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/auth/validate-reset-password-token',
        null,
        {
          headers: {
            reset_password_token
          }
        }
      )
      setUserEmail(res.data.userEmail)
      if (!res.data.isValidReset) navigate('/login')
    } catch (error) {
      return navigate('/login')
    }
  }, [reset_password_token])

  useLayoutEffect(() => {
    tokenValidation()
  }, [])

  const isSamePassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? true : false
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(event.currentTarget.value)
  }
  const handleOnConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordValue(event.currentTarget.value)
  }
  const handleOnClick = async () => {
    if (!userEmail) {
      notifyMessage('Error happened.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: false,
        pauseOnHover: false,
        theme: 'dark'
      })
      return
    }
    const isSamePasswordValue = isSamePassword(
      passwordValue,
      confirmPasswordValue
    )
    if (!isSamePasswordValue) {
      notifyMessage('Password must match confirm password.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: false,
        pauseOnHover: false,
        theme: 'dark'
      })
      return
    }
    const data = {
      password: passwordValue,
      email: userEmail
    }
    try {
      notifyPromise(
        axios.post('http://localhost:8080/auth/create-new-password', data, {
          headers: {
            reset_password_token
          }
        }),
        'Pending password change.',
        'Password changed successfully.',
        'Error happened.',
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
      )
      await axios.delete(
        'http://localhost:8080/auth/delete-reset-password-token',
        {
          headers: {
            reset_password_token
          }
        }
      )
      navigate('login')
    } catch (error) {
      return error
    }
  }
  return (
    <div className="forgot-password-wrapper w-full h-full flex justify-center items-center">
      <form
        method="submit"
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md flex-grow max-w-[70vmin] drop-shadow-[0px_0px_20px_rgb(0,0,0,0.2)]"
      >
        <div className="text-center mt-3">
          <p className="text-violet-600 font-bold text-3xl">
            Create new password
          </p>
        </div>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="px-3 mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 outline-none"
                  value={passwordValue}
                  onChange={handleOnPasswordChange}
                />
              </div>
            </div>
            <div className="px-3 mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  autoComplete="confirmPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 outline-none"
                  value={confirmPasswordValue}
                  onChange={handleOnConfirmPasswordChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/">Cancel</Link>
          <button
            type="submit"
            className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleOnClick}
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  )
}
export default ForgotPassword
