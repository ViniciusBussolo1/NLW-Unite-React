import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}

export function NavLink(props: NavLinkProps) {
  return (
    <a href="" className="font-medium text-sm" {...props}>
      {props.children}
    </a>
  )
}
