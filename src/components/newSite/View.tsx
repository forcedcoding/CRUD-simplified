import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataProp {
    id: number;
    userName: string;
    userPassword: string;
}


const View = () => {

    const [data, setData] = useState<DataProp[]>([]);

    const handleGetUsers = () => {
        axios.get<DataProp[]>('http://localhost:4000/userData')
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log("Error while fetching : ", e);
            })
    }

    const handleDelete = (id:number) => {
        axios.delete('http://localhost:4000/userData/'+id)
        .then(()=>{
            console.log("Successfully Deleted.");
            setData(data.filter(user => user.id !== id));
        })
        .catch((e)=>{
            console.log("Error while Deleting : ",e);
            
        })
    }

    const navigate = useNavigate();
    const handleUpdate = (id:number) => {
        navigate('/update/'+id);
    }

    return (
        <div className="container-fluid bg-info p-3">
            <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={handleGetUsers}
            >
                Get Users Data
            </button>

            {data.length > 0 && (
                <div className="container bg-white p-3 rounded shadow">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Password</th>
                                <th colSpan={2} >Operation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.userPassword}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary sm"
                                            type="button"
                                            onClick={()=>{
                                                handleUpdate(user.id)
                                            }}
                                        >Update</button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn bg-danger text-white btn-ouline-dark"
                                            type="button"
                                            onClick={()=>{
                                                handleDelete(user.id)
                                            }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default View;