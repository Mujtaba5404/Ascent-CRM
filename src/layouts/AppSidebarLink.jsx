import { ActionIcon, Badge, Button, Indicator, Tooltip, useMantineColorScheme } from "@mantine/core";
import { useMemo } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

const IndicatorWrapper = ({ enabled, children }) => {
  if (!enabled) return children;

  return (
    <Indicator size={10} offset={2} processing>
      {children}
    </Indicator>
  );
};

const AppSidebarLink = ({ link, indicatorCount = 0, sidebarCollapsed }) => {
  const { pathname } = useLocation();
  const colorScheme = useMantineColorScheme();

  const isActive = !!matchPath({ path: link.path, end: false }, pathname);

  const variant = isActive ? "filled" : "subtle";
  const textColor = isActive ? undefined : colorScheme.colorScheme === "dark" ? "white" : "dark";

  const showIndicator = indicatorCount > 0;
  const badgeContent = indicatorCount > 9 ? "9+" : indicatorCount;

  const baseProps = useMemo(() => ({ variant, c: textColor, component: Link, to: link.path }), [variant, textColor, link.path]);

  if (sidebarCollapsed) {
    return (
      <IndicatorWrapper enabled={showIndicator}>
        <Tooltip label={link.title} tt={"capitalize"} position="right">
          <ActionIcon {...baseProps} h={36} size="lg" aria-label={link.title}>
            {link.icon}
          </ActionIcon>
        </Tooltip>
      </IndicatorWrapper>
    );
  }

  return (
    <Button
      {...baseProps}
      fw={500}
      tt={"capitalize"}
      justify="flex-start"
      px={6}
      leftSection={link.icon}
      rightSection={
        showIndicator && (
          <Badge w={24} circle color={isActive ? "dark" : undefined}>
            {badgeContent}
          </Badge>
        )
      }
      styles={{ label: { flex: 1 } }}
    >
      {link.title}
    </Button>
  );
};

export default AppSidebarLink;
