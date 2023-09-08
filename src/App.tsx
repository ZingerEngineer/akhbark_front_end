import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import { ToastContainer } from 'react-toastify'
import { createContext, useContext } from 'react'
export const ThemeContext = createContext('light')
export const userDataContext = createContext(null)
const App = () => {
  const theme = useContext(ThemeContext)
  return (
    <div className="app-wrapper w-full h-full flex">
      <ToastContainer />
      <ThemeContext.Provider value={theme}>
        <userDataContext.Provider value={null}>
          <Routes>
            <Route
              path="/"
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
          </Routes>
        </userDataContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
