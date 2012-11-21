//wait for page to load
$(document).ready(function(){

//get user inputs and save to variables on button click
$("#btngo").click(function(){

//get users dob input and store it
  var month = $("#select-choice-month").val();
  var day = $("#select-choice-day").val();
  var year = $("#select-choice-year").val();
  var age = $("#slider-3").val();

//check to make sure birthday is valid
if (day ==0 || month==0 || year==0){
//error
$("#display").html("Please enter a valid birthday.");
}
else
{
//check that a valid age has been chosed/entered
if (age >= 1 && age <= 123)
{  
  //join the individual parts together to create a date
  var concat = month + "/" + day + "/" + year;
    
  //work out how old they are
  var birthday = new Date (concat);
  var today = new Date();
  var years = today.getFullYear() - birthday.getFullYear();
	
  //Reset birthday to the current year
  birthday.setFullYear(today.getFullYear());

  //If the user's birthday has not occurred yet this year, subtract 1.
  if (today < birthday)
  {
   years--;
  }
 
  //current time as unix timestamp in seconds
  var currentunix = (Math.ceil(new Date().getTime() / 1000));
  
  //get the target date
  var target = (Number(year) + Number(age));
  var concatnew = month + "/" + day + "/" + target;
  //convert to unix time
  var targetunix = (Math.ceil(new Date (concatnew).getTime() / 1000));

  //work out the difference
  var total = (Number(targetunix) - Number(currentunix));

  //convert back to days
  var myDatee = (Math.ceil(total / 60 / 60 / 24));
  
  //if number is negative then error!
  //if number is 1 then singular not plural
  
  if (myDatee < 0)
 {
 $("#display").html("Trying to go back in time McFly?  You're " + years + " already!");
 }
 else if (myDatee == 0) //*****need to ignore year for this to work!!****
 {
 $("#subtext").html("Happy Birthday!");
 }
 else
 {
  $("#display").html(myDatee + " days until you're " + age);
  //nested if
  if (myDatee < 800){$("#quote").html("Time to make a bucket list?");}else{}
 }
 }
 else
 {
 $("#display").html("Please choose an age between 1 and 123");
 }
 }
});

});