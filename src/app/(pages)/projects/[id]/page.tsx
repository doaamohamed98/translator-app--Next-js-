"use client"

import { Container } from "@mui/material";
import React from "react";
import { TabsComponent } from "./projectItem/tabs/Tabs";



const IdProject = ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <TabsComponent id={params.id} />
    </Container>
  );
};

export default IdProject;
