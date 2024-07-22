import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_MAIL } from "../utils/constants";
import AdminPanel from "./AdminPanel";
import Login from "./Login";
import SuggestTip from "./SuggestTip";
import TipsList from "./TipsList";

const Routeslist = ({ user }) => {
  const isAuthenticated = user && user.email === ADMIN_MAIL;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tech-tips" />} />
      <Route path="/tech-tips" element={<TipsList />} />
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
