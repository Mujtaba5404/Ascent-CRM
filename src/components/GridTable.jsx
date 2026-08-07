import { Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const GridTable = ({ tableRef, tableHeight = 500, isSticky = true, isCompact = false, children }) => {
  const className = ["grid-table", isSticky && "grid-table--sticky", isCompact && "grid-table--compact"].filter(Boolean).join(" ");

  return (
    <div ref={tableRef} style={{ maxHeight: tableHeight }} className={className}>
      <table>{children}</table>
    </div>
  );
};

GridTable.Header = ({ children }) => <thead>{children}</thead>;

GridTable.Body = ({ children }) => <tbody>{children}</tbody>;

GridTable.Footer = ({ children }) => <tfoot>{children}</tfoot>;

GridTable.Row = ({ children }) => <tr>{children}</tr>;

GridTable.Cell = ({ children, to, colored = false, ...props }) => {
  const clickable = Boolean(to);

  const cellProps = colored ? { bg: "grape.1", c: "dark", fw: 500 } : {};

  const textProps = clickable ? { component: Link, to } : {};
  const textColor = colored || clickable ? "inherit" : "dimmed"; // TODO: use this correctly to render text color otherwise black or dimmed

  return (
    <Paper component="td" radius={0} h="inherit" c={"inherit"} fz="xs" ta={"center"} tt="capitalize" p={"xs"} {...cellProps} {...props}>
      <Text component={"div"} h="100%" c={"inherit"} fz={"inherit"} fw={"inherit"} display={"block"} {...textProps}>
        {children}
      </Text>
    </Paper>
  );
};

export default GridTable;
