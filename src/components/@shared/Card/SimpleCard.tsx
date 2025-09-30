import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  action?: JSX.Element | any;
  cardheading?: JSX.Element | string;
  children?: JSX.Element;
  footer?: JSX.Element;
  headsubtitle?: JSX.Element | string;
  headtitle?: JSX.Element | string;
  middlecontent?: JSX.Element | string;
  subtitle?: string;
  title?: string;
};

const SimpleCard = ({
  action,
  cardheading,
  children,
  footer,
  headsubtitle,
  headtitle,
  middlecontent,
  subtitle,
  title,
}: Props) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      elevation={9}
      sx={{
        border: `1px solid ${borderColor}`,
        padding: 0,
      }}
      variant="outlined"
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              alignItems={"center"}
              direction="row"
              justifyContent="space-between"
              mb={3}
              spacing={2}
            >
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography color="textSecondary" variant="subtitle2">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export { SimpleCard };
