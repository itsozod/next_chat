import * as yup from "yup";
export const RegisterSchema = yup.object({
  username: yup.string().required("Username is required"),
  fullname: yup.string().required("Fullname is required"),
  password: yup.string().required("Password is required"),
});
