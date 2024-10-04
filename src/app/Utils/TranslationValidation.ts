import * as yup from 'yup';
export const schemaCreateTranslation = yup.object({
    key: yup.string().required('Key is required'),
    text: yup.string().required('Text is required'),
  }).required();
  