import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import { SimpleDialog } from "../Dialog/SimpleDialog";

interface Props {
  entityIdentifier?: string;
  handleDelete: () => void;
  isPending?: boolean;
  subtitle?: string;
  title: string;
}

const DeleteEntityDialog = ({
  entityIdentifier,
  handleDelete,
  isPending,
  subtitle,
  title,
}: Props) => {
  return (
    <SimpleDialog
      itemOpen={
        <Tooltip title="Deletar">
          <IconButton size="small" sx={{ margin: 0, padding: 0 }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      }
      title={title}
    >
      <Stack direction={"row"} gap={0.5} ml={1}>
        <Typography>{subtitle}</Typography>
        <Typography
          sx={{
            color: "error.main",
            fontSize: "1.2em",
          }}
        >
          {entityIdentifier}
        </Typography>
      </Stack>
      <Box display={"flex"} justifyContent={"flex-end"} marginTop={"10px"}>
        <Button color="error" disabled={isPending} onClick={handleDelete}>
          Confirmar exclusão
        </Button>
      </Box>
    </SimpleDialog>
  );
};

export { DeleteEntityDialog };
