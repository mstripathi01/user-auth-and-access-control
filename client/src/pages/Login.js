import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Login successfully!");
      onLoginSuccess();
      reset();
    } catch (err) {
      toast.error("Login Failed");
      reset();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </button>
        <ToastContainer position="top-center" autoClose={3000} />
      </form>
    </div>
  );
}
