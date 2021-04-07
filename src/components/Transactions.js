import React from "react";
import Custom from "./functions";
import { useEffect, useState } from "react";

const axios = require("axios");

const LoadTransactionsData = (props) => {
  const id = props.id;
  const transactionsCount = props.count;

  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    const apiUrl = `https://kliqrassessment.herokuapp.com/trxn/${id}`;
    axios
      .get(apiUrl)
      .then(function (response) {
        // handle success
        var data = response.data.data;

        var sumCredit = 0;
        var sumDebit = 0;
        if (data.length > 0) {
          for (var j = 0; j < data.length; j++) {
            if (data[j].type.toLowerCase() === "credit") {
              sumCredit += Number(data[j].amount);
            } else {
              sumDebit += Number(data[j].amount);
            }
          }
        }

        var expenses = Custom.formatMoney(String(sumDebit));
        var earnings = Custom.formatMoney(String(sumCredit));

        setTransactions([expenses, earnings]);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [id])


      return (
        <div id="updateTrxnInfo">
        {transactions.length > 0 && 
        <div>
          <div className="user-summary">
            <small>Total Spent</small>
            <p>{transactions[0]}</p>
          </div>
          <div className="user-summary">
            <small>Total Income</small>
            <p>{transactions[1]}</p>
          </div>
          <div className="user-summary">
            <small>Transactions</small>
            <p>{transactionsCount}</p>
          </div>
        </div>
        }
        </div>
      )

}

//   const id = props.id;
//   const transactionsCount = props.count;
//   const apiUrl = `https://kliqrassessment.herokuapp.com/trxn/${id}`;
//   var domTrxn = document.getElementById("updateTrxnInfo");
//   if (domTrxn) domTrxn.innerHTML = `Waiting for additional user info...`;
//   axios
//     .get(apiUrl)
//     .then(function (response) {
//       // handle success
//       var data = response.data.data;
//       console.log(data);
//       var sumCredit = 0;
//       var sumDebit = 0;
//       if (data.length > 0) {
//         for (var j = 0; j < data.length; j++) {
//           if (data[j].type.toLowerCase() === "credit") {
//             sumCredit += Number(data[j].amount);
//           } else {
//             sumDebit += Number(data[j].amount);
//           }
//         }
//       }
//       document.querySelector("#updateTrxnInfo").innerHTML = `<div>
//       <div class="user-summary">
//         <small>Total Spent</small>
//         <p>${Custom.formatMoney(String(sumDebit))}</p>
//       </div>
//       <div class="user-summary">
//         <small>Total Income</small>
//         <p>${Custom.formatMoney(String(sumCredit))}</p>
//       </div>
//       <div class="user-summary">
//         <small>Transactions</small>
//         <p>${transactionsCount}</p>
//       </div>`;
//     })
//     .catch(function (error) {
//       // handle error
//       // document.querySelector("#updateTrxnInfo").innerHTML = error;
//     })
//     .then(function () {
//       // always executed
//     });
//   return <div id="updateTrxnInfo">Waiting for additional user info...</div>;
// };

export default LoadTransactionsData;
