import Spinner from '../components/spinner'
import { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import { userDataContext } from '../App'
import { useNavigate } from 'react-router-dom'
interface UnAuthenticatedRouteProps {
  children: JSX.Element
}

function UnAuthenticatedRoute(props: UnAuthenticatedRouteProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const userData = useContext(userDataContext)
  const { children } = props
  const key = localStorage.getItem('access_token')
  const checkToken = useCallback(async () => {
    if (key) {
      setIsLoading(false)
      navigate('/home')
    }
    setIsLoading(false)
    return
  }, [])
  useEffect(() => {
    checkToken()
  }, [])

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
export default UnAuthenticatedRoute

//
