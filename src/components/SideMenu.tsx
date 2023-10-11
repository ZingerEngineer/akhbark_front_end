interface SideMenuProps {
  children: JSX.Element
}

function SideMenu(props: SideMenuProps) {
  const { children } = props
  return (
    <div className="side-menu bg-gray-800 h-full w-80 flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
export default SideMenu
