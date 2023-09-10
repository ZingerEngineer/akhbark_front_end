import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ForgotPassword() {
  const handleOnClick = () => {}
  const [emailValue, setEmailValue] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  return (
    <div className="forgot-password-wrapper w-full h-full flex justify-center items-center">
      <form
        method="submit"
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md flex-grow max-w-[70vmin] drop-shadow-[0px_0px_20px_rgb(0,0,0,0.2)]"
      >
        <div className="text-center mt-3">
          <p className="text-violet-600 font-bold text-3xl">Forgot Password</p>
        </div>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
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
