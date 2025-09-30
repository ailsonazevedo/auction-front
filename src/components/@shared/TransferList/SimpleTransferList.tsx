"use client";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface Props {
  checked: readonly number[];
  left: readonly number[];
  right: readonly number[];
  setChecked: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setLeft: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setRight: React.Dispatch<React.SetStateAction<readonly number[]>>;
}
const SimpleTransferList = ({
  checked = [],
  left = [],
  right = [],
  setChecked,
  setLeft,
  setRight,
}: Props) => {
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const customList = (items: readonly number[]) => (
    <Paper
      sx={{
        border: `1px solid ${borderColor}`,
        height: 230,
        overflow: "auto",
        width: 200,
      }}
      variant="outlined"
    >
      <List component="div" dense>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <li key={value}>
              <ListItem onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            </li>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid alignItems="center" container justifyContent="center" spacing={2}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid alignItems="center" container direction="column">
          <Button
            aria-label="move all right"
            disabled={left.length === 0}
            onClick={handleAllRight}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
          >
            <KeyboardDoubleArrowRight height={20} width={20} />
          </Button>
          <Button
            aria-label="move selected right"
            disabled={leftChecked.length === 0}
            onClick={handleCheckedRight}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
          >
            <KeyboardArrowRight height={20} width={20} />
          </Button>
          <Button
            aria-label="move selected left"
            disabled={rightChecked.length === 0}
            onClick={handleCheckedLeft}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
          >
            <KeyboardArrowLeft height={20} width={20} />
          </Button>
          <Button
            aria-label="move all left"
            disabled={right.length === 0}
            onClick={handleAllLeft}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
          >
            <KeyboardDoubleArrowLeft height={20} width={20} />
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};
export { SimpleTransferList };
