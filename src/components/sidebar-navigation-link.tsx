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
  const currentPath = usePathname().substring(1).split("/");
  return (
    <Link href={item.url} {...linkProps} data-active={currentPath.includes(item.url.substring(1))}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </Link>
  );
};

export default SidebarNavigationLink;
