import Spinner from '../components/spinner'
import { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import { userDataContext } from '../App'
import { useNavigate } from 'react-router-dom'
interface PublicRouteProps {
  children: JSX.Element
}

function PublicRoute(props: PublicRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const userData = useContext(userDataContext)
  const { children } = props
  const key = localStorage.getItem('access_token')
  const checkUserData = useCallback(async () => {
    if (!key) {
      setIsLoading(false)
      return
    }
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
      userData?.setUserData(res.data.userData)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      return error
    }
  }, [key, userData])
  useEffect(() => {
    checkUserData()
  }, [checkUserData])

  return (
    <>
      <div className="wrapper w-full h-full flex justify-center items-center">
        {isLoading ? (
          <Spinner
            width="w-12"
            height="h-12"
          />
        ) : (
          children
        )}
      </div>
    </>
  )
}
export default PublicRoute

//
