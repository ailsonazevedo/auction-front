"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

interface IPropsInfoError {
  img?: string;
  labelButton?: string;
  redirecionarRota?: () => void;
  subTituloError?: string;
  tituloError?: string;
}

const ErrorInfo = ({
  img,
  labelButton,
  redirecionarRota,
  subTituloError,
  tituloError,
}: IPropsInfoError) => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="79vh"
      textAlign="center"
    >
      <Container maxWidth="md">
        <Image
          alt="Imagem de erro ou aviso"
          height={250}
          priority={true}
          src={img ?? "/images/cancelError.svg"}
          width={300}
        />

        <Typography align="center" mb={2} variant="h1">
          {tituloError ?? "OPS!!!"}
        </Typography>
        <Typography align="center" mb={2} variant="h4">
          {subTituloError ?? "Algo deu errado. Tente novamente."}
        </Typography>
        <Button
          color="primary"
          disableElevation
          onClick={() =>
            redirecionarRota ? redirecionarRota() : router.push("/")
          }
          variant="contained"
        >
          {labelButton ?? "Voltar para o início"}
        </Button>
      </Container>
    </Box>
  );
};

export default ErrorInfo;
