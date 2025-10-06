import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

import { appsLink } from "../MenuData";

const AppLinks = () => {
  return (
    <Grid container mb={4} spacing={3}>
      {appsLink.map((links) => (
        <Grid item key={links.title} lg={6}>
          <Link
            className="hover-text-primary"
            href={links.href}
            style={{ textDecoration: "none" }}
          >
            <Stack direction="row" spacing={2}>
              <Box
                alignItems="center"
                bgcolor="grey.100"
                display="flex"
                height="45px"
                justifyContent="center"
                minWidth="45px"
              >
                <Avatar
                  alt={links.avatar}
                  src={links.avatar}
                  sx={{
                    borderRadius: 0,
                    height: 24,
                    width: 24,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  className="text-hover"
                  color="textPrimary"
                  fontWeight={600}
                  noWrap
                  sx={{
                    width: "240px",
                  }}
                  variant="subtitle2"
                >
                  {links.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  fontSize="12px"
                  noWrap
                  sx={{
                    width: "240px",
                  }}
                  variant="subtitle2"
                >
                  {links.subtext}
                </Typography>
              </Box>
            </Stack>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export { AppLinks };
