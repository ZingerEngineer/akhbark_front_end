import { userDataContext } from '../App'
import { useContext, useState, useEffect } from 'react'
import { UserData } from '../interfaces/userData'

const Home = () => {
  const [userData, setUserData] = useState<null | UserData>(null)
  const userState = useContext(userDataContext)
  useEffect(() => {
    if (userState) {
      setUserData(userState?.userData)
    }
  }, [userState])
  return (
    <div className="home-wrapper w-full h-full">
      <p>{userData?.userName}</p>
    </div>
  )
}
export default Home
