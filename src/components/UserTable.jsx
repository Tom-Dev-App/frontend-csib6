import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import DeleteUserButton from "./DeleteUserButton";
import axios from "axios";
import authService from "../services/auth.service";
import config from "../utils/config";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const { SERVER_URL } = config();

  const { auth } = authService();
  const { token } = auth();
  // console.log(auth);

  const authorization_token = token ?? "";
  const config_request = {
    headers: {
      Authorization: `Bearer ${authorization_token}`,
    },
  };
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/users`,
        config_request
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const memoizedUsers = useMemo(() => {
    return users.map((user, index) => (
      <tr key={user?.email ?? index}>
        <th scope="row">{index + 1}</th>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td className="d-flex gap-3">
          <Link to={`/dashboard/edit/${user?.id}`} className="btn btn-warning">
            Edit
          </Link>
          <DeleteUserButton userId={user.id} onUserDeleted={fetchUsers} />
        </td>
      </tr>
    ));
  }, [users, fetchUsers]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {memoizedUsers.length > 0 ? (
            memoizedUsers
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No User Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
