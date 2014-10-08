//populate day drop down
$(function () {
    for (var i = 1; i <= 31; i++) {
        $("#select-choice-day").append("<option value='" + i + "'>" + i + "</option>");
    }

    //populate year drop down
    var today = new Date();
    var year  = today.getFullYear();
    for (var i = year; i >= 1889; i--) {
        $("#select-choice-year").append("<option value='" + i + "'>" + i + "</option>");
    }

    //restore previous selections
    var storage = window.localStorage;
	
    if (storage) {
        var val_day = storage.getItem("saved_day");
		var val_mon = storage.getItem("saved_month");
		var val_year = storage.getItem("saved_year");
		var val_age = storage.getItem("saved_age");
		
        if (val_day && val_day.length > 0) {
            $("#select-choice-day").val(val_day);
			$("#select-choice-day").selectmenu("refresh");
        }
		if (val_mon && val_mon.length > 0) {
			$("#select-choice-month").val(val_mon);
			$("#select-choice-month").selectmenu("refresh");
		}
		if (val_year && val_year.length > 0) {
			$("#select-choice-year").val(val_year);
			$("#select-choice-year").selectmenu("refresh");
		}
		if (val_age && val_age.length > 0) {
			$("#age-slider").val(val_age);
			$("#age-slider").slider("refresh");
		}
    }

    //get user inputs and save to variables on button click
    $(document).on('click', '#btngo', function () {
        $('#result').show();
        storage.setItem("saved_day", $("#select-choice-day").val());
		storage.setItem("saved_month", $("#select-choice-month").val());
		storage.setItem("saved_year", $("#select-choice-year").val());
		storage.setItem("saved_age", $("#age-slider").val());
    
        //get users dob input and store it
        var month = $("#select-choice-month").val();
        var day = $("#select-choice-day").val();
        var year = $("#select-choice-year").val();
        var age = $("#age-slider").val();
    
        //check to make sure birthday is valid
        if (day == 0 || month == 0 || year == 0) {
            //error
            $("#display").html("Please enter a valid date of birth.");
        } else {
            //check that a valid age has been chosen/entered
            if (age >= 1 && age <= 123) {
    
                //join the individual parts together to create a date
                var concat = month + "/" + day + "/" + year;
    
                //work out how old they are
                var birthday = new Date(concat);
                var today = new Date();
                var years = today.getFullYear() - birthday.getFullYear();
    
                //Reset birthday to the current year
                birthday.setFullYear(today.getFullYear());
    
                //If the user's birthday has not occurred yet this year, subtract 1.
                if (today < birthday) {
                    years--;
                }
    
                //current time as unix timestamp in seconds
                var currentunix = (Math.ceil(new Date().getTime() / 1000));
    
                //get the target date
                var target = (Number(year) + Number(age));
                var concatnew = month + "/" + day + "/" + target;
                //convert to unix time
                var targetunix = (Math.ceil(new Date(concatnew).getTime() / 1000));
    
                //work out the difference
                var total = (Number(targetunix) - Number(currentunix));
    
                //convert back to days
                var myDatee = (Math.ceil(total / 60 / 60 / 24));
    
                //if number is negative then error!
    
                if (myDatee < 0) {
                    $("#display").html("Trying to go back in time McFly?<br />You're " + years + " years old already!");
                } else {
                    $("#display").html(myDatee + " days until you're " + age + " years old.");
                }
            } else {
                $("#display").html("Please choose an age between 1 and 123");
            }
        }
    });
});