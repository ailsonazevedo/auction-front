"use client";
import { ProfileForm } from "@/components/profile/Forms/ProfileForm";
import { Person } from "@mui/icons-material";
import { Card, CardContent, Divider, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface Props {
  profileId: string;
}

const WrapperProfile = ({ profileId }: Props) => {
  const [tabValue, setTabValue] = useState(0);
  return (
    <Card>
      <Tabs
        aria-label="tab-information-profile"
        indicatorColor="secondary"
        onChange={(_, newValue: number) => setTabValue(newValue)}
        textColor="secondary"
        value={tabValue}
      >
        <Tab icon={<Person />} iconPosition={"start"} label="Meus dados" />
      </Tabs>
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <ProfileForm profileId={profileId} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { WrapperProfile };
