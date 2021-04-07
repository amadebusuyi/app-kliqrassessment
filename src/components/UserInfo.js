import React, {useState, useEffect} from 'react';
import { /* useHistory,*/ useParams, Route } from "react-router-dom";
import formatTime from "./timer";
import LoadTransactionsData from "./Transactions";
import RecurringExpenses from "./RecurringExpenses";
import SimilarUsers from "./SimilarUsers";
const axios = require("axios");

export default function UserInfo() {
  // get the slug url
  const { slug } = useParams();

 
const [recur, setRecur] = useState({
  loading: false,
  recur: null
})

  // Get the ID of the slug url
  var id;
  var slugs = localStorage.slugs;

  if (slugs === "undefined" || !slugs) {
    return <h1 className="mt-5">User not found!</h1>;
  } else slugs = JSON.parse(slugs);

  for (var i = 0; i < slugs.length; i++) {
    if (slugs[i].slug.toLowerCase() === slug.toLowerCase()) {
      id = slugs[i].id;
      break;
    }
  }


  // GET USERDATA from LocalStorage
  var users = localStorage.kliQrUsers;
  if (users === "undefined" || !users) {
    return <h1 className="mt-5">User information not found!</h1>;
  } else users = JSON.parse(users);
  var userData = null;

  for (var k = 0; k < users.length; k++) {
    if (users[k].id === id) {
      userData = users[k];
      break;
    }
  }

  var fullName = userData.first_name +" "+ userData.last_name;



  return (
    <div>
      <img alt="" className="user-image" src={userData.avatar} />
      <h3 className="mt-2">
        <strong>
          {userData.first_name} {userData.last_name}
        </strong>
      </h3>
      <span className="user-description">
        <small>{userData.transactions} Transactions &nbsp;</small>
        &#8226; &nbsp;
        <small>Joined {formatTime(userData.created_at)} ago</small>
      </span>

      {/* To display user transaction information */}
      <div className="mt-5">
        <LoadTransactionsData id={id} count={userData.transactions} />
      </div>
      <div className="row">
        <div className="mt-5 col-md-6">
        <RecurringExpenses id={id} />
        </div>
        <div className="mt-5 col-md-6">
          <SimilarUsers
            id={id}
            users={users}
            fullName={fullName}
          />
        </div>
      </div>
    </div>
  );
}
