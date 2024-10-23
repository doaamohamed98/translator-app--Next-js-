import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";
import TableTranslation from "../tableTranslation/TableTranslation";
import TableDisplayTranslation from "../tableDisplayTranslation/TableDisplayTranslation";

export const TabsComponent = ({ projectsId }: { projectsId: any }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        {value === 0 && (
          <>
            {projectsId && projectsId.targetLanguages ? (
              <>
                <Typography className={styles.ProjectTitle} variant="h5">
                  Project name : {projectsId.title}
                </Typography>
                <Box className={styles.ContainercardLanguages}>
                  {projectsId.targetLanguages.map((project: any) => (
                    <Box key={project.code}>
                      <Card className={styles.cardLanguages}>
                        <CardContent className={styles.cardLanguages}>
                          <Typography>{project.name}</Typography>
                          <Typography variant="h5">{project.code}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Typography>No project data found</Typography>
            )}
          </>
        )}
      
        {/* Translation Tab */}
        {value === 1 && <div>

          <TableTranslation projectsId={projectsId._id} />
          <TableDisplayTranslation projectsId={projectsId}/>
          

          </div>}
      </Box>
    </>
  );
};
