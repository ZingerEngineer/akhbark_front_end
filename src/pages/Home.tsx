import axios from 'axios'
import { userDataContext } from '../App'
import { useContext, useLayoutEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div className="home-wrapper w-full h-full">
      <NavBar />
    </div>
  )
}
export default Home
