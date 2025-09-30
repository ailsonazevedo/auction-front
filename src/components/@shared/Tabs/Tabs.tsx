import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import React from "react";

interface TabsItems {
  disabled?: boolean;
  icon?: React.ReactNode;
  label: React.ReactNode;
  title: string;
  value: number | string;
}

interface Props {
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabsItems: TabsItems[];
  value: number | string;
}

const Tabs = ({ onChange, tabsItems, value }: Props) => {
  return (
    <TabContext value={value}>
      <Box>
        <TabList aria-label="lab API tabs example" onChange={onChange}>
          {tabsItems.map((tab, index) => (
            <Tab key={tab.value} label={tab.title} value={String(index + 1)} />
          ))}
        </TabList>
      </Box>
      <Divider />
      <Box bgcolor="grey.200">
        {tabsItems.map((panel, index) => (
          <TabPanel key={panel.value} value={String(index + 1)}>
            {panel.label}
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  );
};

export { Tabs };
