import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState
} from 'react'
import { UserData } from './interfaces/userData'
import CreateNewPassword from './pages/CreateNewPassword'
import { useLocalStorage } from './hooks/useLocalStorage'
import axios from 'axios'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import UnAuthenticatedRoute from './routes/UnAuthenticatedRoute'
import PublicRoute from './routes/PublicRoute'
import Terms from './pages/Terms'

export const ThemeContext = createContext('light')
export const userDataContext = createContext<{
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
} | null>(null)

function App() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const theme = useContext(ThemeContext)
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
              element={
                <AuthenticatedRoute>
                  <Home />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <UnAuthenticatedRoute>
                  <Register />
                </UnAuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <UnAuthenticatedRoute>
                  <Login />
                </UnAuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/forgot-password"
              element={
                <UnAuthenticatedRoute>
                  <ForgotPassword />
                </UnAuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/create-new-password/:reset_password_token"
              element={
                <UnAuthenticatedRoute>
                  <CreateNewPassword />
                </UnAuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/terms-and-conditions"
              element={
                <PublicRoute>
                  <Terms />
                </PublicRoute>
              }
            ></Route>
          </Routes>
        </userDataContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
