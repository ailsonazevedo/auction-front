"use client";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Logo = () => {
  const { isCollapse, isSidebarHover } = useSidebarStore((state) => state);

  const LinkStyled = styled(Link)(() => ({
    alignItems: "center",
    display: "flex",
    height: "64px",
    paddingTop: isCollapse && !isSidebarHover ? 8 : 0,
    textAlign: "center",
  }));

  return (
    <LinkStyled href="/">
      {isCollapse && !isSidebarHover ? (
        <img alt="logo" height={38} src={"/images/logo.png"} width={38} />
      ) : (
        <img alt="logo" height={50} src={"/images/logo.png"} />
      )}
    </LinkStyled>
  );
};

export default Logo;
