"use client";
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./style.module.scss";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { useRouter } from "next/navigation";
import { deleteProject, getAllProjects } from "@/app/Service/ProjectServices";
import { useMutation, useQuery, useQueryClient } from "react-query";

function Listsprojects({ AllprojectsProps }: { AllprojectsProps: any }) {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: allprojects } = useQuery("Allprojects", getAllProjects);

  //Delete Project
  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries("Allprojects");
    },
    onError: (error) => {
      console.error("Failed to delete project:", error);
    },
  });
  const handleDeleteProject = async (projectId: string) => {
    setopenDeleteDialog(true);
    mutation.mutate(projectId);
  };

  const handleCloseDialog = () => {
    setopenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    handleCloseDialog();
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };
  return (
    <>
      <List>
        {AllprojectsProps?.map((project: any, index: any) => (
          <ListItem
            key={project._id}
            className={styles.ListItem}
            dense
            onClick={() => handleProjectClick(project._id)}
          >
            <ListItemText primary={project.title} />
            <AiOutlineDelete
              className={styles.DeleteIcon}
              onClick={() => handleDeleteProject(project._id)}
            />
          </ListItem>
        ))}
      </List>
      <ConfirmDelete
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default Listsprojects;
