import axios from 'axios'
import { userDataContext } from '../App'
import { useContext, useLayoutEffect, useCallback } from 'react'

const Home = () => {
  const userState = useContext(userDataContext)
  const authValidation = useCallback(async () => {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) return
    try {
      const res = await axios.post(
        'http://localhost:8080/auth/validate-access-token',
        null,
        {
          headers: {
            authorization: access_token
          }
        }
      )
      userState?.setUserData(res.data.userData)
    } catch (error) {
      return error
    }
  }, [])
  useLayoutEffect(() => {
    authValidation()
  }, [])
  return (
    <div className="home-wrapper w-full h-full">
      <p>{userState?.userData?.userName}</p>
    </div>
  )
}
export default Home
