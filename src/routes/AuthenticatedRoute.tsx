import Spinner from '../components/spinner'
import { useState, useEffect, useContext, useCallback } from 'react'
interface AuthenticatedRouteProps {
  children: JSX.Element
}

function AuthenticatedRoute(props: AuthenticatedRouteProps) {
  const authValidation = useCallback(() => {
    const access_token = localStorage.getItem('access_token')
  }, [])
  const { children } = props
}
export default AuthenticatedRoute