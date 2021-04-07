import React from "react";
import { useEffect, useState } from "react";
const axios = require("axios");

const RecurringExpenses = (props) => {
  const id = props.id;

  const RecurringData = (props) => {
    const { recurrings } = props;
    if (!recurrings || recurrings.length === 0 || recurrings.typeof === 'null' || recurrings.typeof === null) return <p> Not available </p>;
    return (
      <div className='recurring-exp'>
        <h4>Recurring Expenses</h4>
        {recurrings.map((recurring, index) => {
            return (
              <span className="recurring" title={recurring.name.toUpperCase() +" (count: "+ recurring.tx_qty +")"}>
                <img src={recurring.icon} alt="" />
              </span>
              )
          })
        }
      </div>
    );
  };


  function RecurringExpensesDisplay({isLoading, ...props}) {

    if (!isLoading) return <RecurringData {...props} />;
      return (
        <p style={{ textAlign: "right", fontSize: "14px" }}>
          Fetching recurring expenses...
        </p>
      );
  }

  const [recurringExpenses, setRecurringExpenses] = useState({
    loading: false,
    recurrings: []
  });


  useEffect(() => {
    setRecurringExpenses({ loading: true });
    const apiUrl = `https://recurring-kliqrassessment.herokuapp.com/${id}`;
    axios
      .get(apiUrl)
      .then(function (response) {
        // handle success
        var data = response.data.data;
        setRecurringExpenses({ loading: false, recurrings: data });
        
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
    <div id="updateRecurringInfo" className="ml-5">    
      <RecurringExpensesDisplay
        isLoading={recurringExpenses.loading}
        recurrings={recurringExpenses.recurrings}
      />
    </div>
  )
};

export default RecurringExpenses;


