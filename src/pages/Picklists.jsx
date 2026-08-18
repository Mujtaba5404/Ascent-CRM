import { Paper, ScrollArea, Tabs } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabList = [
  { label: upperFirst("project services"), value: "project-services", index: true },
  { label: upperFirst("project status"), value: "project-status" },
  { label: upperFirst("project type"), value: "project-type" },
  { label: upperFirst("task priorities"), value: "task-priorities" },
  { label: upperFirst("task status"), value: "task-status" },
  // { label: upperFirst("tax status"), value: "tax-status" },
  // { label: upperFirst("vehicle makes"), value: "vehicle-makes" },
  // { label: upperFirst("vehicle models"), value: "vehicle-models" },
  // { label: upperFirst("vehicle status"), value: "vehicle-status" },
];

const Picklists = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const indexTab = tabList.find((tab) => tab.index);

  const pathParts = pathname.split("/");
  const lastSegment = pathParts[pathParts.length - 1];

  const activeTab = tabList.find((tab) => tab.value === lastSegment)?.value || indexTab.value;

  return (
    <>
      <Tabs variant="pills" mb="lg" value={activeTab} onChange={(value) => navigate(value, { relative: "path" })}>
        <Paper p={4}>
          <ScrollArea w="100%" scrollbars="x" scrollbarSize={10}>
            <Tabs.List style={{ flexWrap: "nowrap" }}>
              {tabList.map((tab, i) => (
                <Tabs.Tab key={i} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </ScrollArea>
        </Paper>
      </Tabs>

      <Outlet />
    </>
  );
};

export default Picklists;
