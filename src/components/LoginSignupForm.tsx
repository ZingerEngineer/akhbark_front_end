import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleSVG from '../svgs/google.svg'
import facebookSVG from '../svgs/facebook.svg'
import LoginSignupFormData from '../interfaces/LoginSignupFormData'
import { notifyMessage } from '../utils/toasts'
interface LoginSignupFormProps {
  formType: string
  formLabel: string
  userName?: boolean
  email?: boolean
  password?: boolean
  abortButtonLabel: string
  approveButtonLabel: string
  callBackDataFunction?: (formData: LoginSignupFormData) => void
}

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
  const navigate = useNavigate()
  const handleGoogleCallBack = async () => {
    try {
      //TODO: Write login  with google logic integrating with backend.
    } catch (error) {}
  }
  const handleFaceBookCallBack = async () => {
    try {
      //TODO: Write login  with facebook logic integrating with backend.
    } catch (error) {}
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
      if (callBackDataFunction && formData) callBackDataFunction(formData)
    }
    return (
      <form
        method="submit"
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md flex-grow max-w-[70vmin] drop-shadow-[0px_0px_20px_rgb(0,0,0,0.2)]"
      >
        <div className="text-center mt-3">
          <p className="text-violet-600 font-bold text-3xl">{formLabel}</p>
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
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      upphoto.com/
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 outline-none"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 outline-none pr-2"
                    value={passwordValue}
                    onChange={(event) => setPasswordValue(event.target.value)}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="auth-buttons px-3 mt-5 flex justify-center">
              {formType
                ? authVendors.map((item) =>
                    item.enabled ? (
                      <button
                        onClick={item.functionality}
                        key={item.alt}
                        className="google-auth-button rounded-full shadow-md border-solid border-2 border-gray-200 p-2 mx-1"
                      >
                        <img
                          className="w-6"
                          src={item.src}
                          alt={item.alt}
                        />
                      </button>
                    ) : (
                      ''
                    )
                  )
                : ''}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {abortButtonLabel}
          </Link>
          <button
            type="submit"
            className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignUp}
          >
            {approveButtonLabel}
          </button>
        </div>
      </form>
    )
  }
}
export default FormComponent
