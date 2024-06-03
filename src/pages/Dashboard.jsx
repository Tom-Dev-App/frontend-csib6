import React from "react";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-dark min-vh-100">
        <div className="row">
          <div className="col-2 bg-white vh-100">
            <Sidebar />
          </div>
          <div className="col-10 p-5">
            <div className="mb-3">
              <h1 className="text-white">Kelola User</h1>
              <Link to="/dashboard/create" className="btn btn-success">
                Create
              </Link>
            </div>
            <UserTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
