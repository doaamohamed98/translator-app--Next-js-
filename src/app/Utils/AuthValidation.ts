import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

export const RegistersSchema = yup.object().shape({
    fullName:yup.string().required('Username is required').trim().min(3,'Username must be at least 3 characters long'),
    email:yup.string().required('Email is required').matches(emailRegex, 'Invalid email'),
    password:yup.string().required('Password is required').trim().min(8,'Password must be at least 8 characters long'),
})


export const LoginSchema = yup.object().shape({
    email:yup.string().trim().required('Email is required').email(`Invalid email or password`),
    password:yup.string().trim().required("Password is required'"),
})