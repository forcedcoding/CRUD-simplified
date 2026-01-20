import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface UserProp {
    userName: string;
    userPassword: string;
}

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = id;
    const [updatedMessage, setUpdatedMessage] = useState<string>("");
    const [enableReturn, setEnableReturn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProp>({
        userName: "",
        userPassword: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    useEffect(() => {
        if (!userId) return;

        axios
            .get<UserProp>(`http://localhost:4000/userData/${userId}`)
            .then((res) => setUserData(res.data));
    }, [userId]);

    const handleUpdate = () => {
        axios
            .put(`http://localhost:4000/userData/${userId}`, userData)
            .then(() => {
                console.log("Updated Successfully.");
                setUpdatedMessage("Updated Successfully");
                setEnableReturn(true);
            });
    };

    const handleReturn = () => {
        navigate('/view');
    }
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow-lg p-4 w-50">
                <h4 className="text-center mb-4">Update User</h4>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input
                        id="userName"
                        type="text"
                        className="form-control"
                        name="userName"
                        value={userData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input
                        id="userPassword"
                        type="password"
                        className="form-control"
                        name="userPassword"
                        value={userData.userPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>

                <div>
                    <div>{updatedMessage}</div>
                    {(enableReturn) && (
                        <div>
                            <button type="button" onClick={handleReturn}  >Go to View</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Update;
