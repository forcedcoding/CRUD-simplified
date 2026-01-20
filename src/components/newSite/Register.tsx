import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { validateUserName, validatePassword } from "./Validate";

interface DataProp {
  userName: string;
  userPassword: string;
}

const Register = () => {
  const [data, setData] = useState<DataProp>({
    userName: "",
    userPassword: ""
  });

  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value
    });

    if (name === "userName") {
      setNameError(
        value && !validateUserName(value)
          ? "Only letters allowed (min 2 characters)"
          : ""
      );
    }

    if (name === "userPassword") {
      setPasswordError(
        value && !validatePassword(value)
          ? "Password must be at least 6 characters and include letters and numbers"
          : ""
      );
    }

    setSuccess("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isNameValid = validateUserName(data.userName);
    const isPasswordValid = validatePassword(data.userPassword);

    if (!isNameValid) {
      setNameError("Only letters allowed (min 2 characters)");
    }

    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters and include letters and numbers");
    }

    if (!isNameValid || !isPasswordValid) return;

    setLoading(true);

    axios
      .post("http://localhost:4000/userData", data)
      .then(() => {
        setSuccess("User registered successfully");
        setData({ userName: "", userPassword: "" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="card shadow-lg p-4 w-50">
        <h4 className="text-center mb-4">Register</h4>

        {success && (
          <div className="alert alert-success py-2">
            {success}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className={`form-control ${nameError ? "is-invalid" : ""}`}
            name="userName"
            type="text"
            value={data.userName}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          {nameError && (
            <div className="invalid-feedback">
              {nameError}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
            name="userPassword"
            type="password"
            value={data.userPassword}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          {passwordError && (
            <div className="invalid-feedback">
              {passwordError}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
