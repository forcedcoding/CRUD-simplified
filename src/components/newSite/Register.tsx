import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

interface DataProp {
    userName: string;
    userPassword: string;
}

const Register = () => {
    const [data, setData] = useState<DataProp>({
        userName: "",
        userPassword: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        axios
            .post("http://localhost:4000/userData", data)
            .then(() => {
                console.log("Posted Successfully.");
            })
            .catch((e) => {
                console.log("Error:", e);
            });
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="p-2 bg-light shadow-lg rounded m-3 w-50">
                <div className="form-group m-2">
                    <label htmlFor="userName">Name:</label>
                    <input
                        className="form-control"
                        name="userName"
                        id="userName"
                        type="text"
                        value={data.userName}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="userPassword">Password:</label>
                    <input
                        className="form-control"
                        name="userPassword"
                        id="userPassword"
                        type="password"
                        value={data.userPassword}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
