"use client";
import { Icon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarNavigationLink = ({
  item, ...linkProps
}: {
  item: {
    title: string;
    url: string;
    icon?: Icon;
  };
  linkProps?: React.ComponentProps<typeof Link>;
}) => {
  const currentPath = usePathname();
  return (
    <Link href={item.url} {...linkProps} data-active={currentPath.startsWith(item.url)}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </Link>
  );
};

export default SidebarNavigationLink;
