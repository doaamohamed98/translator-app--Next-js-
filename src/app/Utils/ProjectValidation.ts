import * as yup from 'yup';
export const schemaCreateProject = yup.object({
    title: yup.string().required('Project name is required'),
    targetLanguages: yup.array().required('At least one language is required').min(1,"At least one target language is required"),
  }).required();