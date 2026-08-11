import { Paper, ScrollArea, Tabs } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabList = [
  // { label: upperFirst("asset status"), value: "asset-status", index: true },
  // { label: upperFirst("asset categories"), value: "asset-categories" },
  // { label: upperFirst("asset sub categories"), value: "asset-sub-categories" },
  // { label: upperFirst("banks"), value: "banks" },
  // { label: upperFirst("client health"), value: "client-health" },
  // { label: upperFirst("client status"), value: "client-status"},
  // { label: upperFirst("departments"), value: "departments" },
  // { label: upperFirst("employee allowance types"), value: "employee-allowance-types" },
  // { label: upperFirst("employee commute modes"), value: "employee-commute-modes" },
  // { label: upperFirst("employee commute types"), value: "employee-commute-types" },
  // { label: upperFirst("employee confirmation types"), value: "employee-confirmation-types" },
  // { label: upperFirst("employee designations"), value: "employee-designations" },
  // { label: upperFirst("employee exit reasons"), value: "employee-exit-reasons" },
  // { label: upperFirst("employee genders"), value: "employee-genders" },
  // { label: upperFirst("employee increment types"), value: "employee-increment-types" },
  // { label: upperFirst("employee marital status"), value: "employee-marital-status" },
  // { label: upperFirst("employee qualification degrees"), value: "employee-qualification-degrees" },
  // { label: upperFirst("employee qualification majors"), value: "employee-qualification-majors" },
  // { label: upperFirst("employee separation types"), value: "employee-separation-types" },
  // { label: upperFirst("employee shift types"), value: "employee-shift-types" },
  // { label: upperFirst("employee status"), value: "employee-status" },
  // { label: upperFirst("employee types"), value: "employee-types" },
  // { label: upperFirst("insurance providers"), value: "insurance-providers" },
  // { label: upperFirst("lead sources"), value: "lead-sources" },
  // { label: upperFirst("locations"), value: "locations" },
  // { label: upperFirst("maintenance status"), value: "maintenance-status" },
  // { label: upperFirst("marketing platforms"), value: "marketing-platforms" },
  // { label: upperFirst("order payment gateways"), value: "order-payment-gateways" },
  // { label: upperFirst("order stages"), value: "order-stages" },
  { label: upperFirst("order services"), value: "order-services", index: true },
  { label: upperFirst("order status"), value: "order-statuses" },
  { label: upperFirst("project status"), value: "project-status" },
  { label: upperFirst("project type"), value: "project-type" },
  // { label: upperFirst("procurement banks"), value: "procurement-banks" },
  // { label: upperFirst("procurement billing status"), value: "procurement-billing-status" },
  // { label: upperFirst("procurement categories"), value: "procurement-categories" },
  // { label: upperFirst("procurement delay reasons"), value: "procurement-delay-reasons" },
  // { label: upperFirst("procurement payment modes"), value: "procurement-payment-modes" },
  // { label: upperFirst("procurement payment status"), value: "procurement-payment-status" },
  // { label: upperFirst("procurement priorities"), value: "procurement-priorities" },
  // { label: upperFirst("procurement status"), value: "procurement-status" },
  // { label: upperFirst("procurement tax challan status"), value: "procurement-tax-challan-status" },
  // { label: upperFirst("sitting cost heads"), value: "sitting-cost-heads" },
  // { label: upperFirst("subscription service providers"), value: "subscription-service-providers" },
  // { label: upperFirst("subscription services"), value: "subscription-services" },
  // { label: upperFirst("subscription service types"), value: "subscription-service-types" },
  // { label: upperFirst("subscription status"), value: "subscription-status" },
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
