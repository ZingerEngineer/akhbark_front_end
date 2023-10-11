import {
  Cog6ToothIcon,
  UserIcon,
  NoSymbolIcon,
  BookmarkIcon,
  UserGroupIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import react, { Fragment, ReactElement } from 'react'
import { Menu, Transition } from '@headlessui/react'

const renderIconAsNode = (
  iconComponent: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
) => {
  return react.createElement(iconComponent) as ReactElement
}
interface ISideMenuButtonContextMenuItem {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
}
interface ISideMenuButton {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
  droppable: boolean
  contextMenuItems?: ISideMenuButtonContextMenuItem[]
}

const settingsButtonContextMenuItems = [
  {
    icon: UserIcon,
    label: 'Profile'
  },
  {
    icon: NoSymbolIcon,
    label: 'Blocked users'
  }
]
export const SideMenuButtons: ISideMenuButton[] = [
  {
    icon: Cog6ToothIcon,
    label: 'Settings',
    droppable: true,
    contextMenuItems: settingsButtonContextMenuItems
  },
  {
    icon: BookmarkIcon,
    label: 'Saved',
    droppable: false
  },
  {
    icon: UserGroupIcon,
    label: 'Groups',
    droppable: false
  }
]

interface SideMenuButtonProps {
  label: string
  droppable: boolean
  contextMenuItems: ISideMenuButtonContextMenuItem[] | undefined
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function SideMenuButton(props: SideMenuButtonProps) {
  const { label, droppable, contextMenuItems } = props
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-around gap-x-1.5  bg-gray-700 px-3 py-2 text-sm font-semibold text-white  hover:bg-gray-600">
          {label}
          {droppable ? (
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          ) : (
            ''
          )}
        </Menu.Button>
      </div>

      {droppable ? (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {contextMenuItems?.map((item) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {renderIconAsNode(item.icon)}
                      {item.label}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      ) : (
        ''
      )}
    </Menu>
  )
}
export default SideMenuButton
