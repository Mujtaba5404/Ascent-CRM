import { Loader, Paper, ScrollArea, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Generic QueryTabs component
 * @param {Array} items - array of objects to render as tabs
 * @param {string} queryParamName - query param key to sync with URL
 * @param {string} labelKey - object key for tab label
 * @param {string} valueKey - object key for tab value (default "_id")
 * @param {boolean} isLoading - show loader while data is loading
 */
const QueryTabs = ({ items, queryParamName, labelKey, valueKey = "_id", isLoading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("");

  // Initialize active tab from query param or first item
  useEffect(() => {
    if (items?.length) {
      const paramValue = searchParams.get(queryParamName);
      setActiveTab(paramValue || items[0][valueKey]);
    }
  }, [items, searchParams, queryParamName, valueKey]);

  // Sync activeTab to query param
  useEffect(() => {
    if (activeTab) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set(queryParamName, activeTab);
        return params;
      });
    }
  }, [activeTab, queryParamName, setSearchParams]);

  if (isLoading) return <Loader />;

  if (!items?.length) return null;

  return (
    <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
      <Paper p={4}>
        <ScrollArea w={"100%"} scrollbars="x" scrollbarSize={10}>
          <Tabs.List style={{ flexWrap: "nowrap" }}>
            {items.map((item) => (
              <Tabs.Tab key={item[valueKey]} value={item[valueKey]} tt="capitalize">
                {item[labelKey]}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>
      </Paper>
    </Tabs>
  );
};

export default QueryTabs;
