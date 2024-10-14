"use client";

import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React from 'react';

const IdProject = ({ params }: { params: { id: string } }) => {
  // const { id } = useParams();
  return (
    <Box>
     <div>
      <h1>Project Details</h1>
      <p>Project ID: {params.id}</p>
    </div>
    
    </Box>
  )
}

export default IdProject