import { Box, Card, CardContent, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";
import { useQuery } from "react-query";
import { notFound } from "next/navigation";
import { getProjectsById } from "@/service/ProjectServices";
import LanguagesTab from "./handdelLanguagesTab/LanguagesTab";
import TranslationTab from "./handdelTranslationTab/TranslationTab";
export const TabsComponent = ({ id }: { id: any }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //Get Project By ID
  const { data: project ,isLoading , error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectsById(id),
  });

  if (isLoading) return <CircularProgress />;
  
  if (error) {
    notFound();
    return null;
  }
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className={styles.Tabs}
      >
        <Tab label="Languages" />
        <Tab label="Translation" />
      </Tabs>

      <Box>
        {/* Languages Tab */}
        {value === 0 && project && (
          <LanguagesTab title={project.title} targetLanguages={project.targetLanguages} />
        )}

        {/* Translation Tab */}
        {value === 1 && project && (
          <TranslationTab projectId={project._id} title={project.title} />
        )}
      </Box>
    </>
  );
};
