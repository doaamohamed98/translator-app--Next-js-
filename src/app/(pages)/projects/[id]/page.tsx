"use client";
import { getProjectsById } from '@/app/Service/ProjectServices';
import { Container, } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { TabsComponent } from '@/app/components/tabs/Tabs';

const IdProject = ({ params }: { params: { id: string } }) => {
  //Get Project By ID 
  const { data :ProjectsById, isLoading, error } = useQuery(
    ["project", params.id],
    () => getProjectsById(params.id),
  );
  return (
    <Container>
    <TabsComponent projectsId={ProjectsById}  />
  </Container>
);
}

export default IdProject