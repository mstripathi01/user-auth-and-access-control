import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login({ onLoginSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successfully!");
      onLoginSuccess();
      reset();
    } catch (err) {
      toast.error("Login Failed");
      reset();
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in with Google!");
      onLoginSuccess();
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Flex row: Login and Google button */}
        <div className="flex items-center justify-between mt-4 gap-4">
          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <div className="google-btn-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error("Google Sign-In Failed")}
              width="200"
            />
          </div>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </form>
    </div>
  );
}
