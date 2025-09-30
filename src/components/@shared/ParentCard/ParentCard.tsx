"use client";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  footer?: JSX.Element | string;
  title: string;
};

const ParentCard = ({ children, footer, title }: Props) => {
  return (
    <Card
      elevation={9}
      sx={{
        padding: 0,
      }}
    >
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ParentCard;
