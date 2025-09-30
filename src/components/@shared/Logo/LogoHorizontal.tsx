"use client";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const LogoHorizontal = () => {
  const LinkStyled = styled(Link)(() => ({
    display: "block",
    height: "100%",
    overflow: "hidden",
    paddingRight: "10px",
    paddingTop: "2px",
    textAlign: "center",
  }));

  return (
    <LinkStyled href="/">
      <img alt="logo" height={50} src={"/images/logos/logo-bdh.svg"} />
    </LinkStyled>
  );
};

export { LogoHorizontal };
