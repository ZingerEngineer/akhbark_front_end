import NavBar from '../components/NavBar'
import SideMenu from '../components/SideMenu'
import SideMenuButton from '../components/SideMenuButton'
import { SideMenuButtons } from '../components/SideMenuButton'

const Home = () => {
  return (
    <div className="home-wrapper w-full h-full">
      <NavBar />
      <SideMenu>
        <div className="flex flex-col w-full h-full">
          {SideMenuButtons.map((button) => {
            return (
              <SideMenuButton
                icon={button.icon}
                key={button.label}
                label={button.label}
                droppable={button.droppable}
                contextMenuItems={button.contextMenuItems}
              />
            )
          })}
        </div>
      </SideMenu>
    </div>
  )
}
export default Home
