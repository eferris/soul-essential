function myLogic() {

  /* return value set in multiple place */
  var finalMsg="";
  var urlStr="http://localhost:5000/rout/";

  /* get entry field contents */
  var myFname = document.getElementById("fnameTxt")
  var myLname = document.getElementById("lnameTxt")
  var myEmail = document.getElementById("emailTxt")
  var myTArea = document.getElementById("msgTxt")

  /* if all entry fields referenced succesfully */
  if ((myEmail) && (myTArea)  && (myFname) && (myLname)) {

    /* get all but msg text here in the URL */
    urlStr+=myFname.value+':';
    urlStr+=myLname.value+':';
    urlStr+=myEmail.value

    // Using the core jquery $.ajax() method
    
    $.ajax({
    

      async: true,

      // The URL for the request
      url: urlStr.value,

      // The data to send to backend
      data: {
          fname: myFname.value,
          lname: myLname.value,
          email: myEmail.value,
          umsg: myTArea.value   /* textarea */
      },

      // Whether this is a POST or GET request
      type: "GET",

      // The type of data we expect back
      dataType : "jsonp",
    })

    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
      finalMsg = "";
    })

    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
      finalMsg += ` Unfortunately ${myFname.value}, the update failed. Please contact us below on Facebook`;
    })

    // Code to run regardless of success or failure;
    // 
    .always(function( xhr, status ) {
      document.getElementById("fnameTxt").value="";
      document.getElementById("lnameTxt").value="";
      document.getElementById("emailTxt").value="";
      document.querySelector("#msgTxt").innerText = 
         "Dear Amy ...    \n\n";
});
// end ajax    

  }
  else  /* problem accessing the input */ 
  {
    finalMsg += " There was a problem accesing your info.";
  }  
  return(finalMsg);
}

//  Add listeners on page load
function onLoadPage() {
document.querySelector("#msgTxt").innerText = "Dear Amy ...    \n\n";

//  add button listener
//
var userBtn = document.querySelector("#go-user");

userBtn.addEventListener("click", (event)  => {
  document.querySelector("#result").innerText = myLogic();
  });
}

//  add enter-key listeners - focus on first name
//
var fnamKey = document.querySelector("#fnameTxt");
fnamKey.addEventListener("keyup", (event)  => {
  if ( event.keyCode === 13 )
    document.querySelector("#result").innerText = 
      myLogic();   /* main function */
  else    
    document.querySelector("#result").innerText = "";
  return false;
});

//  add enter-key listeners - focus on last name
//
var lnamKey = document.querySelector("#lnameTxt");
lnamKey.addEventListener("keyup", (event)  => {
  if ( event.keyCode === 13 )
    document.querySelector("#result").innerText = 
      myLogic();   /* main function */
  else    
    document.querySelector("#result").innerText = "";
  return false;
});

//  add enter-key listeners - focus on email
//
var mailKey = document.querySelector("#emailTxt");
mailKey.addEventListener("keyup", (event)  => {
  if ( event.keyCode === 13 )
    document.querySelector("#result").innerText = 
      myLogic();   /* main function */
  else    
    document.querySelector("#result").innerText = "";
  return false;
});

//  add enter-key listeners - focus on textarea
//
var msgKey = document.querySelector("#msgTxt");
msgKey.addEventListener("keyup", (event)  => {
  if ( event.keyCode === 13 )
    document.querySelector("#result").innerText = 
      myLogic();   /* main function */
  else    
    document.querySelector("#result").innerText = "";
  return false;
});