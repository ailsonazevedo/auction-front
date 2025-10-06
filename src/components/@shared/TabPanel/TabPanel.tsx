import { Box } from "@mui/system";

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: number;
  readonly value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <div
      aria-labelledby={`Aba-simples-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export { TabPanel };
