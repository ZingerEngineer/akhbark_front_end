import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, useState } from 'react'
import { UserData } from './interfaces/userData'
import CreateNewPassword from './pages/CreateNewPassword'

export const ThemeContext = createContext('light')
export const userDataContext = createContext<{
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
} | null>(null)

function App() {
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
            <Route
              path="/create-new-password/:frgt"
              element={<CreateNewPassword />}
            ></Route>
          </Routes>
        </userDataContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
