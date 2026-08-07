import { ActionIcon, Group, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import Logo from "src/components/Logo";
import UserMenu from "src/components/UserMenu";
import SCOPE from "src/constants/SCOPE";
import GlobalCompanySelect from "src/features/companies/GlobalCompanySelect";

const AppHeader = ({ sidebarCollapsed = false, handleSidebarCollapse = () => {} }) => {
  const [auth] = useLocalStorage({ key: "auth", getInitialValueInEffect: false });

  const CAN_SELECT_COMPANY = [SCOPE.ALL, SCOPE.COMPANY].includes(auth.effectiveScope);

  return (
    <Group h={"100%"} justify="flex-end">
      <Logo w={110} />

      <ActionIcon size={"lg"} title="Toggle sidebar" onClick={handleSidebarCollapse} mr={"auto"}>
        {sidebarCollapsed ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
      </ActionIcon>

      <Text tt={"capitalize"} visibleFrom="sm">
        👋 Hi, {auth.name}!
      </Text>

      {CAN_SELECT_COMPANY && <GlobalCompanySelect />}

      <UserMenu />
    </Group>
  );
};

export default AppHeader;
