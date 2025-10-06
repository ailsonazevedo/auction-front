import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const notFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      textAlign="center"
    >
      <Container maxWidth="md">
        <Image
          alt="404"
          height={300}
          priority={true}
          src={"/images/errorimg.svg"}
          width={300}
        />
        <Typography align="center" mb={2} variant="h1">
          Ops!!!
        </Typography>
        <Typography align="center" mb={2} variant="h4">
          A página que você está procurando não existe.
        </Typography>
        <Button
          color="primary"
          component={Link}
          disableElevation
          href="/"
          variant="contained"
        >
          ir para o início
        </Button>
      </Container>
    </Box>
  );
};

export default notFound;
