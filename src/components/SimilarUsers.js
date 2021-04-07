import React, { useEffect, useState } from "react";
import formatTime from "./timer";
import Custom from "./functions";
import { NavLink } from "react-router-dom";
const axios = require("axios");

export default function SimilarUsers(props) {

  const id = props.id;
  const users = props.users;
  const fullName = props.fullName;

  const SimilarUsersData = (props) => {
  const { similarUsers } = props;

  if (!similarUsers || similarUsers.length === 0) return <p></p>;
  return (
    <ul className="similar-users-list">
    <h6><strong>USERS LIKE "{fullName}"</strong></h6>
      {similarUsers.map((similarUser) => {
        return (
          <li key={similarUser.id} className="px-3 user-in-list">
            <NavLink
              className="row"
              to={Custom.getSlug(
                similarUser.id,
                similarUser.first_name + " " + similarUser.last_name
              )}
            >
              <div className="col-2">
                <img className="user-image" src={similarUser.avatar} alt="" />
              </div>
              <div className="pl-2 col-10">
                <h5 className="user-name">
                  {similarUser.first_name} {similarUser.last_name}
                </h5>
                <span className="user-description">
                  <small>{similarUser.transactions} Transactions &nbsp;</small>
                  &#8226; &nbsp;
                  <small>Joined {formatTime(similarUser.created_at)} ago</small>
                </span>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

  function SimilarUsersDisplay({isLoading, ...props}) {

    if (!isLoading) return <SimilarUsersData {...props} />;
      return (
        <p style={{ textAlign: "right", fontSize: "14px" }}>
          Fetching similar user...
        </p>
      );
  }

  const [similarUsers, setSimilarUsers] = useState({
    loading: false,
    similarUsers: null
  });

  useEffect(() => {

    setSimilarUsers({ loading: true });
    const apiUrl = `https://similar-kliqrassessment.herokuapp.com/${id}`;
    axios
      .get(apiUrl)
      .then(function (response) {
        // handle success
        var data = response.data;

        var findMatches = (list1, list2, isUnion = false) =>
            list1.filter((a) => isUnion === list2.some((b) => a.id === b));

        var matches = findMatches(users, data, true);

        setSimilarUsers({ loading: false, similarUsers: matches });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [id]);
  return (
      <div className="row">
        {/* List of similar users */}
          <SimilarUsersDisplay
            isLoading={similarUsers.loading}
            similarUsers={similarUsers.similarUsers}
          />
      </div>
  );
}