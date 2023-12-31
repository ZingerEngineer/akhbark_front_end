import { Fragment, MouseEventHandler, useCallback } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../App'
import logoImage from '../svgs/akhbark_logo.svg'
import user_default from '../svgs/user_default.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { renderIconAsNode } from '../utils/renderIconAsNode'

interface navigationItem {
  name: string
  link: string
  current: boolean
  functionality?: React.MouseEventHandler<HTMLAnchorElement>
}

interface profileMenuItem {
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  function: MouseEventHandler<HTMLButtonElement>
}

function classNames(...classes: (boolean | string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

const navigation: navigationItem[] = [
  { name: 'Feed', link: '/feed', current: true },
  { name: 'Stories', link: 'stories', current: false },
  { name: 'Games', link: '/games', current: false }
]

export default function NavBar() {
  const navigate = useNavigate()
  const key = localStorage.getItem('access_token')
  const handleLogOutClick = useCallback(async () => {
    try {
      if (!key) return
      const res = await axios.delete('http://localhost:8080/auth/logout', {
        headers: {
          authorization: key
        }
      })
      if (res.data.isDeleted) {
        localStorage.removeItem('access_token')
        navigate('/login')
      }
    } catch (error) {
      return error
    }
  }, [])
  const handleProfileButtonClick = useCallback(() => {
    navigate('/profile')
  }, [])
  const profileMenuItems: profileMenuItem[] = [
    { label: 'Profile', icon: UserIcon, function: handleProfileButtonClick },
    {
      label: 'logout',
      icon: ArrowRightOnRectangleIcon,
      function: handleLogOutClick
    }
  ]
  const userData = useContext(userDataContext)
  const [userEmail, setUserEmail] = useState<string | null | undefined>(null)
  const [userImage, setUserImage] = useState<string | null | undefined>(null)

  useEffect(() => {
    setUserEmail(userData?.userData?.email)
    setUserImage(userData?.userData?.avatar)
  }, [userData])
  return (
    <Disclosure
      as="nav"
      className="bg-gray-600 hover:bg-gray-500 duration-100 border-b-gray-600 border-t-gray-600"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to="/"
                    className="block h-8 w-auto lg:hidden"
                  >
                    <img
                      className="h-8 w-auto"
                      src={logoImage}
                      alt="Your Company"
                    />
                  </Link>
                  <Link
                    to="/"
                    className="hidden h-8 w-auto lg:block"
                  >
                    <img
                      className="h-8 w-auto"
                      src={logoImage}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) =>
                      item.functionality ? (
                        <Link
                          onClick={item.functionality}
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? ' text-white  bg-orange-400 hover:bg-orange-300 hover:duration-200'
                              : 'text-white hover:bg-gray-700/50 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? ' text-white  bg-orange-400 hover:bg-orange-300 hover:duration-200'
                              : 'text-white hover:bg-gray-700/50 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="user-credentials ml-3 flex flex-row items-center bg-white/20 p-1 rounded-full">
                <p className="mx-3 text-white font-semibold">{userEmail}</p>
                <Menu as="div">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userImage ? userImage : user_default}
                        alt="user_avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profileMenuItems.map((item) => (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={item.function}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 w-full text-left flex flex-row gap-2'
                                  : 'flex flex-row gap-2',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-left '
                              )}
                            >
                              {renderIconAsNode(item.icon, 'w-5')}
                              {item.label}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) =>
                item.functionality ? (
                  <Link
                    onClick={item.functionality}
                    key={item.name}
                    to={item.link}
                    className={classNames(
                      item.current
                        ? 'text-white bg-orange-400 hover:bg-orange-300 hover:duration-200'
                        : 'text-white hover:bg-gray-700/50 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={classNames(
                      item.current
                        ? 'text-white bg-orange-400 hover:bg-orange-300 hover:duration-200'
                        : 'text-white hover:bg-gray-700/50 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
