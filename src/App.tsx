import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className="app-wrapper w-full h-full flex">
      <ToastContainer />
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
    </div>
  )
}

export default App

