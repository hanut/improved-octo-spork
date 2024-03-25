"use client";

import Link from "next/link";

export type NavListItemProps = {
  href: string;
  label: string;
};

const NavListItem: React.FC<NavListItemProps> = ({ href, label }) => {
  return (
    <Link
      className="flex p-4 bg-blue-100 border border-d-2 border-gray-300"
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavListItem;
