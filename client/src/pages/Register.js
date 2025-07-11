import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", data);
      alert("Registration successful");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Name</label>
          <input {...register("name")} className="form-control" />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" {...register("email")} className="form-control" />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
