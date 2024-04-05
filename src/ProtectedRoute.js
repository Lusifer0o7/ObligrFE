import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    navigate("/login");
  }

  if (user.role !== "admin" || "reseller") {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
