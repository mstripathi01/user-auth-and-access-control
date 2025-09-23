import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = process.env.REACT_APP_API_URL;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[A-Z]/, "Must include uppercase letter")
    .matches(/[a-z]/, "Must include lowercase letter")
    .matches(/[0-9]/, "Must include a number")
    .matches(/[@$!%*?&]/, "Must include special character")
    .required("Password is required"),
});

export default function Register({ onLoginSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, data);
      toast.success("Registration successfully!");
      reset();
    } catch (err) {
      toast.error("Registration failed");
      reset();
    }
  };

  const handleGoogleRegisterSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Registered with Google!");
      onLoginSuccess();
    } catch (err) {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Name</label>
          <input
            {...register("name")}
            className="form-control"
            autoComplete="off"
          />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="form-control"
            autoComplete="off"
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
            autoComplete="off"
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <div className="google-btn-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleRegisterSuccess}
            onError={() => toast.error("Google Sign-Up Failed")}
            width="200"
          />
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </form>
    </div>
  );
}
