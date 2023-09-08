import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import ForgotPassword from './views/ForgotPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, useState } from 'react'
import { UserData } from './interfaces/userData'

export const ThemeContext = createContext('light')
export const userDataContext = createContext<{
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
} | null>(null)
const App = () => {
  const theme = useContext(ThemeContext)
  const [userData, setUserData] = useState<UserData | null>(null)
  return (
    <div className="app-wrapper w-full h-full flex">
      <ToastContainer />
      <ThemeContext.Provider value={theme}>
        <userDataContext.Provider
          value={{
            userData,
            setUserData
          }}
        >
          <Routes>
            <Route
              path="/home"
              element={<Home />}
            ></Route>
            <Route
              path="/register"
              element={<Register />}
            ></Route>
            <Route
              path="/login"
              element={<Login />}
            ></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            ></Route>
          </Routes>
        </userDataContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
