import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { loadUser } from "../actions/userAction";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
      dispatch(loadUser());
    }
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {user.role === "admin" ? (
            <Button onClick={() => navigate("/admin/users")}>see users</Button>
          ) : (
            ""
          )}
          <h2>This is a {user.role} portal.</h2>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>{user.address}</p>
              </div>
              <div>
                <h4>Role</h4>
                <p>{user.role}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt)}</p>
              </div>
              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
