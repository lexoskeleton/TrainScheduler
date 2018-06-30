  // Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train information - then update the html + update the database
// 3. Create a way to retrieve train info from the database.
// 4. Create a way to calculate the minutes until the next train's arrival. Using difference between arrival time and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate next arrival and minutes away
  
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBqjcZ7a-7OjAMxx-BIwNV9-qDx45ux_68",
        authDomain: "trainscheduler-8dd41.firebaseapp.com",
        databaseURL: "https://trainscheduler-8dd41.firebaseio.com",
        projectId: "trainscheduler-8dd41",
        storageBucket: "trainscheduler-8dd41.appspot.com",
        messagingSenderId: "703569191773"
      };
      firebase.initializeApp(config);

  //set a database variable
  var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
     // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: time,
    freqency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears the text-boxes for next input
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding the newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);
  
    // Format the train time
    var trainTime= moment().format("HH:mm");
  
     //Difference between train time and frequency
    // 
        var trainDiff = moment().diff(moment(trainTime, "X"), "minutes");
        console.log(trainDiff);
  
    // Calculate the next arrival using
  
    // Create the new row
        var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(time),
        $("<td>").text(frequency),
        $("<td>").text(trainDiff),
     
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  