'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
  }

  const SidebarNavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-700 p-2 rounded block text-lg ${
        active ? 'text-white font-semibold' : 'text-gray-300'
      }`}
    //className="py-2 px-4 rounded text-left hover:bg-gray-700"
    >
      {children}
    </Link>
  );
};

export default SidebarNavLink;
