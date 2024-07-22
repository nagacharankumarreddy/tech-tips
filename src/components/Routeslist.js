import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TipsList from "./TipsList";
import SuggestTip from "./SuggestTip";
import AdminPanel from "./AdminPanel";
import Login from "./Login";
import { ADMIN_MAIL } from "../constants";

const Routeslist = ({ user }) => {
  const isAuthenticated = user && user.email === ADMIN_MAIL;

  return (
    <Routes>
      <Route path="/" element={<TipsList />} />
      <Route path="/suggest-tip" element={<SuggestTip />} />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routeslist;
