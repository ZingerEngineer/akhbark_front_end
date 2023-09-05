import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import user_white from '../svgs/user_white.svg'
import { Link } from 'react-router-dom'
import { signOutUser } from '../utils/signOutUser'
import { notifyMessage } from '../utils/toasts'
import { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../App'
interface navigationItem {
  name: string
  link: string
  current: boolean
  functionality?: React.MouseEventHandler<HTMLAnchorElement>
}
const handleLogOut = async () => {
  await signOutUser()
  notifyMessage('Logged out.')
}
const navigation: navigationItem[] = [
  { name: 'Uploader', link: '/uploader', current: true }
]

function classNames(...classes: (boolean | string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

const Example = () => {
  const userData = useContext(userDataContext)
  const [userEmail, setUserEmail] = useState<string | null | undefined>(null)
  const [userImage, setUserImage] = useState<string | null | undefined>(null)

  useEffect(() => {
    setUserEmail(userData?.currentUser?.email)
    setUserImage(userData?.currentUser?.photoURL)
  }, [userData])
  return (
    <Disclosure
      as="nav"
      className="bg-transparent hover:bg-white/5 duration-100"
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
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </Link>
                  <Link
                    to="/"
                    className="hidden h-8 w-auto lg:block"
                  >
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
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
                              ? ' text-white drop drop-shadow-[0px_0px_5px_rgba(255,255,255,0.5)] bg-violet-600/20 hover:bg-white/20 hover:duration-200'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                              ? ' text-white drop drop-shadow-[0px_0px_5px_rgba(255,255,255,0.5)] bg-violet-600/20 hover:bg-white/20 hover:duration-200'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                        src={userImage ? userImage : user_white}
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="user/settings"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={handleLogOut}
                            to="welcome"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item>
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
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
export default Example
