import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";

interface LanguagesTabProps {
  title: string;
  targetLanguages: {
    name: string;
    code: string;
  }[];
}

const LanguagesTab: React.FC<LanguagesTabProps> = ({
  title,
  targetLanguages,
}) => {
  return (
    <>
      <Typography className={styles.ProjectTitle} variant="h5">
        Project name: {title}
      </Typography>
      <Box className={styles.ContainercardLanguages}>
        {targetLanguages.map((language) => (
          <Box key={language.code}>
            <Card className={styles.cardLanguages}>
              <CardContent>
                <Typography>{language.name}</Typography>
                <Typography variant="h5">{language.code}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LanguagesTab;

