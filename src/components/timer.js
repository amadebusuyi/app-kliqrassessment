//_________________________________________________________________________
/********** To format timestamp to an easily readable format **********/

var timeFromNow = function (time) {
  // Get timestamps
  var unixTime = new Date(time).getTime();
  if (!unixTime) return;
  var now = new Date().getTime();

  // Calculate difference
  var difference = unixTime / 1000 - now / 1000;

  // Setup return object
  var tfn = {};

  // Check if time is in the past, present, or future
  tfn.when = "now";
  if (difference > 0) {
    tfn.when = "future";
  } else if (difference < -1) {
    tfn.when = "past";
  }

  // Convert difference to absolute
  difference = Math.abs(difference);

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    if (difference / (60 * 60 * 24 * 365) > 2) tfn.unitOfTime = "years";
    else tfn.unitOfTime = "year";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    if (difference / (60 * 60 * 24 * 45) > 2) tfn.unitOfTime = "months";
    else tfn.unitOfTime = "month";

    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = "days";
    tfn.time = Math.floor(difference / (60 * 60 * 24));
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = "hours";
    tfn.time = Math.floor(difference / (60 * 60));
  } else if (difference / 60 > 1) {
    // Hours
    tfn.unitOfTime = "minutes";
    tfn.time = Math.floor(difference / 60);
  } else {
    // Seconds
    tfn.unitOfTime = "seconds";
    tfn.time = Math.floor(difference);
  }

  // Return time from now data
  return tfn;
};

var formatTime = (time) => {
  let c_time = timeFromNow(time);

  if (c_time.when === "now") return "Just Now";
  else if (c_time.when === "past") return c_time.time + " " + c_time.unitOfTime;
};

export default formatTime;
