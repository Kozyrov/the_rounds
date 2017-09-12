$(window).on("load", function () {
    $("#login_modal").modal("show");
    $(document).ready(function () {
        $("#new_user").click(function(){
            account_creation();
        });
    });
});


function account_creation(){
    //append new account creation form
    $("#modal_form").prepend("<span>First Name</span><br><input class='fn_input' type='text' name='first_name'><br><span>Last Name</span><br><input class='ln_input' type='text' name='last_name'><br>");
    $("#modal_form").append("<span>Confirm Password</span><br><input class='password_confirm' type='text' name='password_confirm'><br><br><button id='submit_user' type='button' class='btn btn-success'>Submit</button>");
    $("#submit_user").click(function(){
        password_validation()
    });
};

function password_validation(){
    //check that the passwords match first
    let password = $(".password_input").val();
    let confirmation = $(".password_confirm").val();
    if(password===confirmation){
        form_validation();
    } else {
        $(".validation_message").text("The passwords do not match")
        $(".password_input, .password_confirm").click(function(){
            message_clear();
        });
    }
};

function form_validation(){
    
};

function message_clear(){
    $(".validation_message").text("");  
};

function New_User(email, display_name, password){
    this.email = email,
    this.display_name = display_name,
    this.password = password
};