import react, { ReactElement } from 'react'

export const renderIconAsNode = (
  iconComponent: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >,
  customClassName?: string
) => {
  return react.createElement(iconComponent, {
    className: customClassName
  }) as ReactElement
}
