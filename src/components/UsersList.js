import React from "react";
import formatTime from "./timer";
import Custom from "./functions";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios");


const UsersList = () => {

  const UsersListDisplay = (props) => {
  const { users } = props;
  if (!users || users.length === 0) return <p>No users, sorry</p>;
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id} className="px-3 user-in-list">
            <NavLink
              className="row"
              to={Custom.getSlug(
                user.id,
                user.first_name + " " + user.last_name
              )}
            >
              
              <div className="col-2">
                <img className="user-image" src={user.avatar} alt="" />
              </div>
              <div className="pl-2 col-10">
                <h5 className="user-name">
                  {user.first_name} {user.last_name}
                </h5>
                <span className="user-description">
                  <small>{user.transactions} Transactions &nbsp;</small>
                  &#8226; &nbsp;
                  <small>Joined {formatTime(user.created_at)} ago</small>
                </span>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

function UsersListData({isLoading, ...props}) {

  if (!isLoading) return <UsersListDisplay {...props} />;
  return (
    <p style={{ textAlign: "right", fontSize: "14px" }}>
      Fetching users, might take a while...
    </p>
  );
}

  const [users, setUsers] = useState({
    loading: false,
    users: null
  });

  useEffect(() => {
    setUsers({ loading: true });
    const apiUrl = `https://kliqrassessment.herokuapp.com/`;
    axios
      .get(apiUrl)
      .then(function (response) {
        // handle success
        var data = response.data.data;
        // Store users data to localStorage for ease of access
        if (data.length > 0) {
          localStorage.kliQrUsers = JSON.stringify(data);
        }
        setUsers({ loading: false, users: data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [setUsers]);

  return (
  	<div>
	  	<div className="users-list">
		    <h6 className="text-left ml-4 pl-1 pt-2 mt-4 mb-3">
		      <strong>USERS</strong>
		    </h6>
		    <UsersListData
		      isLoading={users.loading}
		      users={users.users}
		      className="user-list"
		    />
		</div>
	</div>
  )
}

export default UsersList;
