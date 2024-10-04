import * as yup from 'yup';
export const schemaCreateProject = yup.object({
    title: yup.string().required('Project name is required'),
    targetLanguages: yup.array().min(1).required('At least one language is required'),
  }).required();