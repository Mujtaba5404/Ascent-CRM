import { Stack } from "@mantine/core";
import { IconBriefcase, IconFolderCog, IconUserDollar } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AppSidebarLink from "./AppSidebarLink";

const links = [
  { title: "clients", path: "/clients", resource: "client", icon: <IconUserDollar size={20} /> },
  { title: "projects", path: "/projects", resource: "project", icon: <IconFolderCog size={20} /> },
  // { title: "tasks", path: "/tasks", resource: "task", icon: <IconListCheck size={20} /> },
];

const AppSidebar = ({ sidebarCollapsed = false }) => {
  return (
    <Stack gap={"xs"}>
      {links.map((link) => (
        <CanAccess key={link.path} resource={link.resource} action="read">
          <AppSidebarLink link={link} sidebarCollapsed={sidebarCollapsed} />
        </CanAccess>
      ))}
    </Stack>
  );
};

export default AppSidebar;
