"use client";
import { RegistersData } from "@/app/Data/fieldsData";

import {
  Box,
  Button,
  FormControl,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Link,
  TextField,
  InputAdornment,
} from "@mui/material";
import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/app/Utils/AuthValidation";
import { createUser } from "@/app/Service/AuthServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FacebookIcon from "@/Assets/icons8-facebook.svg";
import GoogleIcon from "@/Assets/icons8-google.svg";
import Image from "next/image";
import styles from "./style.module.scss";
import usePasswordVisibility from "@/app/Hooks/usePasswordVisibility";

interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
}
const Page: NextPage = () => {
  const { getPasswordInputProps } = usePasswordVisibility();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (
    data: RegisterFormInputs
  ) => {
    try {
      const newUser = await createUser(data);
      toast.success("Successful to Create Account");
      reset();
      router.push("/sign-in");
      return newUser;
    } catch (error: any) {
      if (error.response.data.error === "Conflict") {
        setError("email", {
          type: "manual",
          message: "User Already Exists",
        });
      } else {
        toast.error(`Registration failed. Please try again`);
      }
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" mb={2} fontWeight="bold">
            Sign up for an Account
          </Typography>

          <div className={styles["Container_FormControl"]}>
            {RegistersData.map((input) => (
              <FormControl key={input.name}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {input.icon}
                      </InputAdornment>
                    ),
                    ...(input.type === "password"
                      ? getPasswordInputProps().InputProps
                      : { type: input.type }),
                  }}
                  placeholder={input.placeholder}
                  type={
                    input.name === "password"
                      ? getPasswordInputProps().type
                      : input.type
                  }
                  {...register(input.name as keyof RegisterFormInputs)}
                  error={!!errors[input.name as keyof RegisterFormInputs]}
                  helperText={
                    errors[input.name as keyof RegisterFormInputs]?.message
                  }
                />
              </FormControl>
            ))}
          </div>

          <div className={styles["terms-and-conditions"]}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography
                  variant="caption"
                  className={styles["terms-and-conditions-text"]}
                >
                  By creating an account you agree to the
                  <Link
                    href="/terms"
                    className={styles["terms-and-conditions-text_Links"]}
                  >
                    Terms & Conditions
                  </Link>
                  and our
                  <Link
                    href="/privacy"
                    className={styles["terms-and-conditions-text_Links"]}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          </div>

          <Button variant="contained" type="submit">
            sign up
          </Button>

          <div className={styles["container_Or_with"]}>
            <Box flex={1}>
              <Divider />
            </Box>
            <Typography variant="caption" mx={2}>
              {" "}
              Or sign up with
            </Typography>
            <Box flex={1}>
              <Divider />
            </Box>
          </div>

          <div className={styles["button-container"]}>
            <Button
              variant="outlined"
              type="button"
              startIcon={<Image src={GoogleIcon} alt="GoogleIcon" width={30} />}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              type="button"
              startIcon={
                <Image src={FacebookIcon} alt="FacebookIcon" width={30} />
              }
            >
              Facebook
            </Button>
          </div>

          <div className={styles["base_flex"]}>
            <Typography variant="caption">
              {" "}
              Already have an account?
              <Link href={"/sign-in"} className={styles["base_Link"]}>
                {" "}
                Log In
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
