import {
  Cog6ToothIcon,
  UserIcon,
  NoSymbolIcon,
  BookmarkIcon,
  UserGroupIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { renderIconAsNode } from '../utils/renderIconAsNode'
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
    label: 'Edit profile'
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
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
  droppable: boolean
  contextMenuItems: ISideMenuButtonContextMenuItem[] | undefined
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function SideMenuButton(props: SideMenuButtonProps) {
  const { icon, label, droppable, contextMenuItems } = props
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button
          key={label}
          className="inline-flex w-full justify-between gap-x-1.5  bg-gray-700 px-3 py-2 text-sm font-semibold text-white  hover:bg-gray-600"
        >
          <div className="tab-label-icon flex flex-row gap-2">
            {renderIconAsNode(icon, 'w-5')}
            {label}
          </div>
          {droppable ? (
            <ChevronDownIcon
              key={label}
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
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <a
                      key={item.label}
                      href="#"
                      className={classNames(
                        active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 flex flex-row gap-2',
                        'block px-4 py-2 text-sm flex flex-row gap-2'
                      )}
                    >
                      {renderIconAsNode(item.icon, 'w-5')}
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
