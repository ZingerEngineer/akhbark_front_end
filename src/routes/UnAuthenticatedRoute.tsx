import Spinner from '../components/spinner'
import { useState, useEffect, useContext, useCallback } from 'react'
interface UnAuthenticatedRouteProps {
  children: JSX.Element
}

function UnAuthenticatedRoute(props: UnAuthenticatedRouteProps) {
  const authValidation = useCallback(() => {
    const access_token = localStorage.getItem('access_token')
  }, [])
  const { children } = props
}
export default UnAuthenticatedRoute
