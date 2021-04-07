import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";
// import usersListLoading from "./components/UsersListLoading";
import { Route } from "react-router-dom";
import UserInfo from "./components/UserInfo";
// import LastShot from "./components/lastshot";
// const axios = require("axios");

export default function App() {

  return (
    <div className="App">
      {/* NAVBAR */}
      <div className="container-fluid custom-navbar">&nbsp;</div>

      <div className="container-fluid">
        <div className="row">
          {/* List of users */}
            <UsersList />
          <div className="user-info">
            <Route path="/:slug">
              <UserInfo />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
}
