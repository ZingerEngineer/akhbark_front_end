import { MouseEventHandler, ReactNode } from 'react'
interface ButtonComponentProps {
  customClass?: string
  buttonContent?: ReactNode
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>
  buttonFunction?: MouseEventHandler<HTMLButtonElement>
}
export default ButtonComponentProps
