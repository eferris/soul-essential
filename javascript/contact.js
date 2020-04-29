function myLogic() {
  var myFname = document.getElementById("fnameTxt")
  var myLname = document.getElementById("lnameTxt")
  var myEmail = document.getElementById("emailTxt")

  if ((myEmail) && (myFname) && (myLname)) {
    // Using the core $.ajax() method
    $.ajax({
    
      // The URL for the request
      url: "python/Quickstart.py",

      // The data to send (will be converted to a query string)
      data: {
          id: myFname.value
      },

      // Whether this is a POST or GET request
      type: "GET",

      // The type of data we expect back
      dataType : "json",
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
      return( "Success!" );
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
      return( "Sorry, there was a problem!" );
    })
    // Code to run regardless of success or failure;
    .always(function( xhr, status ) {
      return( "The request is complete!" );
    });
    return `We can\'t wait to meet you ${myFname.value}!`;
  }  
}

//  Add listeners on page load
function onLoadPage() {
document.querySelector("#msgTxt").innerText = "Dear Amy ...    \n\n";

//  add enter-key listener
//
var stubKey = document.querySelector("input");
stubKey.addEventListener("keyup", (event)  => {
  if ( event.keyCode === 13 )
    document.querySelector("#result").innerText = myLogic();
  return false;
  });

//  add button listener
//
var stubBtn = document.querySelector("#go-stub");

stubBtn.addEventListener("click", (event)  => {
  document.querySelector("#result").innerText = myLogic();
  });
}


