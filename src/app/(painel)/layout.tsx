import type { Metadata } from "next";

import { Footer } from "@/components/Layouts/vertical/footer/Footer";
import { Header } from "@/components/Layouts/vertical/header/Header";
import { PageWrapper } from "@/components/Layouts/wrapper/PageWrapper";
import { Box, Container } from "@mui/material";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Leilão de carteiras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <PageWrapper>
        <Header />
        <Container
          sx={{
            maxWidth: "100%!important",
            px: { md: 12, sm: 4, xs: 2 },
          }}
        >
          <Box>
            <Suspense>{children}</Suspense>
          </Box>
        </Container>
        <Footer />
      </PageWrapper>
    </Box>
  );
}
