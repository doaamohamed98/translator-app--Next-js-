import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;

export const RegisterSchema = yup.object().shape({
    fullname:yup.string().trim().required('Full Name is required').min(3,'Username must be at least 3 characters long').matches(fullNameRegex, 'Username must include at least first and last name'),
    email:yup.string().trim().required('Email is required').matches(emailRegex, 'Invalid email'),
    password:yup.string().trim().required('Password is required').min(8,'Password must be at least 8 characters long'),
});


export const LoginSchema = yup.object().shape({
    email:yup.string().trim().matches(emailRegex, 'Invalid email').required('Email is required'),
    password:yup.string().trim().required('Password is required'),
});