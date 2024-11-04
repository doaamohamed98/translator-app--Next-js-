
import * as yup from 'yup';
export const schemaUpdateTranslation = yup.object({
    key: yup.string().required('Key is required'),
    text: yup.string().required('Text is required'),
    updateLanguages: yup.array().min(1).required('At least one language is required'),
  });

