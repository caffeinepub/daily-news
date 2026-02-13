import { Link, type LinkProps } from '@tanstack/react-router';
import { type ReactNode } from 'react';

interface NavLinkProps extends Omit<LinkProps, 'children'> {
  children: ReactNode;
  onClick?: () => void;
}

export default function NavLink({ children, onClick, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      onClick={onClick}
      className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground [&.active]:text-foreground [&.active]:font-semibold"
      activeProps={{
        className: 'text-foreground font-semibold',
      }}
    >
      {children}
    </Link>
  );
}
