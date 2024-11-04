"use client";
import React from "react";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProject, getAllProjects } from "@/service/ProjectServices";
import ConfirmDelete from "@/components/comfirmDelete/ComfirmDelete";
import { toast } from "react-toastify";

interface Project {
  _id: string;
  title: string;
}

function Listsprojects() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: allprojects,
    isLoading,
    isError,
  } = useQuery<Project[]>({
    queryKey: "allProjects",
    queryFn: getAllProjects,
  });

  //Delete Project
  const { mutate: handleDeleteProject } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries("allProjects");
    },
    onError:()=>{
    toast.error("Error deleting project");
    },
  });

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <>
      {isLoading && <CircularProgress />}

      {isError && (
        <Typography color="error" align="center">
          "An error occurred while loading projects. Please try again."
        </Typography>
      )}

      {!isLoading && !isError && (
        <List>
          {allprojects?.map((project: any) => (
            <ListItem
              key={project._id}
              className={styles.ListItem}
              dense
              onClick={() => handleProjectClick(project._id)}
            >
              <ListItemText primary={project.title} />
              <ConfirmDelete
                onConfirm={() => handleDeleteProject(project._id)}
                title="Delete Confirmation"
                message="Are you sure you want to delete this Project?"
                trigger={
                  <IconButton className={styles.DeleteIcon}>
                    <AiOutlineDelete />
                  </IconButton>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default Listsprojects;
