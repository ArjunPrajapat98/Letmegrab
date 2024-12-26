import * as Yup from "yup";

export const errorSchema = {
  loginSchema: Yup.object().shape({
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Required"),
  }),
  registerSchema: Yup.object().shape({
    userName: Yup.string().required("Required"),
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  productSchema: Yup.object().shape({
    title: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
  }),
};
