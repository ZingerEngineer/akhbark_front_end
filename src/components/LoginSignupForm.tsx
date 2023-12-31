import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleSVG from '../svgs/google.svg'
import facebookSVG from '../svgs/facebook.svg'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'
import { ThemeContext } from '../App'
import { renderIconAsNode } from '../utils/renderIconAsNode'
import {
  KeyIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { getGoogleOAuthURL } from '../services/getGoogleOAuthURL'
interface LoginSignupFormProps {
  formType: string
  formLabel: string
  userName?: boolean
  email?: boolean
  password?: boolean
  abortButtonLabel: string
  approveButtonLabel: string
  callBackDataFunction?: (formData: LoginSignupFormData) => Promise<void>
}

const handleGoogleCallBack = async () => {
  try {
    getGoogleOAuthURL()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error, `Error Message:${error.message}`)
      return
    }
    console.log(error)
    return
  }
}
const handleFaceBookCallBack = async () => {
  try {
    //TODO: Write login  with facebook logic integrating with backend.
  } catch (error) {}
}

const loginFormOptions = [
  {
    label: 'Forgot password ?',
    link: '/forgot-password',
    icon: KeyIcon
  },
  {
    label: 'Join us.',
    link: '/register',
    icon: UserPlusIcon
  }
]

const registerFormOptions = [
  {
    label: 'Already registered ?',
    link: '/login',
    icon: ArrowLeftOnRectangleIcon
  },
  {
    label: 'Terms & Conditions',
    link: '/terms-and-conditions',
    icon: ShieldCheckIcon
  }
]

const authVendors = [
  {
    enabled: true,
    src: googleSVG,
    alt: 'google-icon',
    functionality: handleGoogleCallBack
  },
  {
    enabled: true,
    src: facebookSVG,
    alt: 'facebook-icon',
    functionality: handleFaceBookCallBack
  }
]

const FormComponent = ({
  formType,
  formLabel,
  userName,
  email,
  password,
  abortButtonLabel,
  approveButtonLabel,
  callBackDataFunction
}: LoginSignupFormProps) => {
  const theme = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const [userNameValue, setUserNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [formData, setFormData] = useState<LoginSignupFormData>()
  useEffect(() => {
    setFormData({
      userName: userNameValue,
      email: emailValue,
      password: passwordValue
    })
  }, [userNameValue, emailValue, passwordValue])
  const handleSignUp = () => {
    try {
      if (callBackDataFunction && formData) callBackDataFunction(formData)
    } catch (error) {
      return
    }
  }
  return (
    <form
      method="submit"
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-md flex-grow max-w-[70vmin] drop-shadow-[0px_0px_20px_rgb(0,0,0,0.2)]"
    >
      <div className="text-center mt-3">
        <p className="text-orange-500 font-bold text-3xl">{formLabel}</p>
      </div>

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {userName ? (
            <div className="px-3 mt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    akhbark.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    placeholder="janesmith"
                    value={userNameValue}
                    onChange={(event) => setUserNameValue(event.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {email ? (
            <div className="px-3 mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-3 outline-none"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                />
              </div>
            </div>
          ) : (
            ''
          )}

          {password ? (
            <div className="px-3 mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pl-3 outline-none pr-2"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="auth-buttons px-3 mt-5 flex justify-center">
            <a
              href={getGoogleOAuthURL()}
              className="google-auth-button rounded-full shadow-md border-solid border-2 border-gray-200 p-2 mx-1"
            >
              <img
                className="w-6"
                src={googleSVG}
                alt={'google icon'}
              />
            </a>
          </div>
          <div className="form-options px-3 mt-5 flex justify-center gap-4">
            {formType === 'login'
              ? loginFormOptions.map((item) => (
                  <Link
                    key={item.label}
                    className="gap-2 text-sm font-semibold leading-6 text-white flex flex-row bg-orange-500 rounded-md p-2"
                    to={item.link}
                  >
                    {renderIconAsNode(item.icon, 'w-5')}
                    {item.label}
                  </Link>
                ))
              : registerFormOptions.map((item) => (
                  <Link
                    key={item.label}
                    className="gap-2 text-sm font-semibold leading-6 text-white flex flex-row bg-orange-500 rounded-md p-2"
                    to={item.link}
                  >
                    {renderIconAsNode(item.icon, 'w-5')}
                    {item.label}
                  </Link>
                ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/login"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {abortButtonLabel}
        </Link>
        <button
          type="submit"
          className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          onClick={handleSignUp}
        >
          {approveButtonLabel}
        </button>
      </div>
    </form>
  )
}
export default FormComponent
