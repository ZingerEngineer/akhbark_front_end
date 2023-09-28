import axios from 'axios'
import { userDataContext } from '../App'
import { useContext, useLayoutEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import NavBar from '../components/NavBar'

const Home = () => {
  const userState = useContext(userDataContext)
  const { key } = useLocalStorage('access_token')

  const authValidation = useCallback(async () => {
    if (!key) return
    try {
      const res = await axios.post(
        'http://localhost:8080/auth/validate-access-token',
        null,
        {
          headers: {
            authorization: key
          }
        }
      )
      userState?.setUserData(res.data.userData)
    } catch (error) {
      return error
    }
  }, [key, userState])
  useLayoutEffect(() => {
    authValidation()
  }, [key, authValidation])
  return (
    <div className="home-wrapper w-full h-full">
      <NavBar />
    </div>
  )
}
export default Home
