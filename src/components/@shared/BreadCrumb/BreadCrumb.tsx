"use client";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TypographyStyle } from "@mui/material/styles";
import { IconCircle } from "@tabler/icons-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ItemsProps {
  href?: string;
  title: string;
  to?: string;
}

interface BreadCrumbProps {
  altImage?: string;
  backgroundColor?: string;
  img?: string;
  items?: ItemsProps[];
  propsStyles?: {};
  subtitle?: string;
  title: string;
}

const Breadcrumb = ({
  altImage,
  img,
  items,
  propsStyles,
  subtitle,
  title,
}: BreadCrumbProps) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const bgColor = isAdmin ? "admin.breadcrumb.bg" : "user.breadcrumb.bg";
  const titleColor = isAdmin
    ? "admin.breadcrumb.title"
    : "user.breadcrumb.title";
  const subtitleColor = isAdmin
    ? "admin.breadcrumb.subtitle"
    : "user.breadcrumb.subtitle";
  const borderColor = isAdmin
    ? "admin.breadcrumb.borderColor"
    : "user.breadcrumb.borderColor";
  const defaultStylesBreadCrumb = {
    backgroundColor: bgColor,
    borderColor: borderColor,
    borderRadius: "16px",
    borderStyle: "solid",
    marginBottom: "10px",
    my: 2,
    overflow: "hidden",
    p: "18px 25px 20px",
    position: "relative",
  };
  const renderBreadcrumbsTypographyStyle = {
    color: subtitleColor,
    textDecoration: "none",
  };
  return (
    <Grid container sx={propsStyles ?? defaultStylesBreadCrumb}>
      <Grid item lg={12} mb={1} md={12} sm={12} xs={12}>
        <Box sx={{ width: "100%" }}>
          <Typography color={titleColor} variant="h4">
            {title}
          </Typography>
        </Box>
        <Typography
          color={subtitleColor}
          fontWeight={400}
          mb={0}
          mt={0.8}
          variant="h6"
        >
          {subtitle}
        </Typography>
        {items && (
          <RenderBreadcrumbs
            items={items}
            typographyStyle={renderBreadcrumbsTypographyStyle}
          />
        )}
      </Grid>
      <RenderRightSideBreadCrumb altImage={altImage} img={img} />
    </Grid>
  );
};

const RenderBreadcrumbs = ({
  items,
  typographyStyle,
}: {
  items: ItemsProps[];
  typographyStyle: TypographyStyle;
}) => (
  <Breadcrumbs
    aria-label="breadcrumb"
    separator={
      <IconCircle
        color="white"
        fill="white"
        fillOpacity={"0.6"}
        size="5"
        style={{ margin: "0 5px" }}
      />
    }
    sx={{ alignItems: "center", marginBottom: "0px", mt: items ? "10px" : "" }}
  >
    {items.map((item) => (
      <Typography
        component={NextLink}
        href={item.to ?? item.href ?? ""}
        key={item.title}
        sx={{
          ...typographyStyle,
          "&:hover": {
            opacity: item.to || item.href ? 0.8 : 1,
            textDecoration: item.to || item.href ? "underline" : "none",
          },
          cursor: item.to || item.href ? "pointer" : "default",
        }}
      >
        {item.title}
      </Typography>
    ))}
  </Breadcrumbs>
);

const RenderRightSideBreadCrumb = ({
  altImage,
  img,
}: {
  altImage?: string;
  img?: string;
}) => (
  <Grid alignItems="flex-end" display="flex" item lg={4} sm={6} xs={12}>
    <Box
      sx={{
        alignItems: "center",
        display: { lg: "flex", md: "block", xs: "none" },
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Box sx={{ bottom: "0", position: "absolute" }}>
        {img && (
          <img
            alt={altImage ?? "breadCumbLogo"}
            src={img}
            style={{ height: "124px", width: "124px" }}
          />
        )}
      </Box>
    </Box>
  </Grid>
);

export { Breadcrumb };
