import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { logout } from "@/actions/logout";
import { useDeleteUser } from "@/hooks/user/useDelete/useDeleteUser";
import { useGetInfoLoggedUser } from "@/hooks/user/useGet/useGetInfoLoggedUser";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { ValidateTwoFaForm } from "./ValidateTwoFaForm";

function DeleteUserForm() {
  const [isTwoFaValidated, setIsTwoFaValidated] = useState(false);
  const queryClient = useQueryClient();
  const { data: UserDataInfo } = useGetInfoLoggedUser();
  const { mutateAsync: deleteUser } = useDeleteUser([]);

  const handleDelete = async () => {
    const userId = await getLoggedUserId();
    await deleteUser(userId);
    await logout();
    queryClient.removeQueries();
  };
  const handleTwoFaSuccess = () => {
    setIsTwoFaValidated(true);
  };
  return (
    <Box
      sx={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {UserDataInfo?.isTwoFactorAuthenticationEnabled && !isTwoFaValidated && (
        <Box textAlign={"center"}>
          <ValidateTwoFaForm onSuccess={handleTwoFaSuccess} />
          <Typography color={"error"} sx={{ mt: 2 }}>
            Para deletar o usuário, valide o código de dois fatores.
          </Typography>
        </Box>
      )}
      <Stack direction="row" gap={2} mt={2}>
        {UserDataInfo?.isTwoFactorAuthenticationEnabled && isTwoFaValidated && (
          <Button
            onClick={handleDelete}
            sx={{
              "&.MuiButton-root.Mui-disabled": {
                bgcolor: "rgb(146 56 56)",
                color: "rgb(255 255 255 / 50%);",
              },
              "&.MuiButton-root:hover": { bgcolor: "#d32f2f" },
              backgroundColor: "red",
              color: "white",
              marginTop: "1rem",
            }}
          >
            Excluir conta
          </Button>
        )}
        {!UserDataInfo?.isTwoFactorAuthenticationEnabled && (
          <Button
            onClick={handleDelete}
            sx={{
              "&.MuiButton-root.Mui-disabled": {
                bgcolor: "rgb(146 56 56)",
                color: "rgb(255 255 255 / 50%);",
              },
              "&.MuiButton-root:hover": { bgcolor: "#d32f2f" },
              backgroundColor: "red",
              color: "white",
              marginTop: "1rem",
            }}
          >
            Excluir conta
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default DeleteUserForm;
