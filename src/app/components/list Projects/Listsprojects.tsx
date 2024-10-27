"use client";
import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { deleteProject} from "@/app/service/ProjectServices";
import { useMutation, useQueryClient } from "react-query";
import ConfirmDelete from "../comfirmDelete/ComfirmDelete";

interface Project {
  _id: string;
  title: string;
}

function Listsprojects({ AllprojectsProps }: { AllprojectsProps:Project[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();

 //Delete Project
const {mutate:handleDeleteProject}= useMutation({
  mutationFn: deleteProject,
  onSuccess:()=>{
    queryClient.invalidateQueries('allProjects')
  },
});
  
  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };
  return (
    <>
      <List>
        {AllprojectsProps?.map((project: any) => (
          <ListItem
            key={project._id}
            className={styles.ListItem}
            dense
            onClick={() => handleProjectClick(project._id)}
          >

            <ListItemText primary={project.title} />
            <ConfirmDelete
            onConfirm={()=>handleDeleteProject(project._id)}
            title="Delete Confirmation"
            message="Are you sure you want to delete this Project?"
            trigger={
              <IconButton className={styles.DeleteIcon}>
               <AiOutlineDelete />
            </IconButton >
            }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Listsprojects;
