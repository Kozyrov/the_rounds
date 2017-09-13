$(window).on("load", function () {
    $("#login_modal").modal("show");
    $(document).ready(function () {
        $("#new_user").click(function(){
            account_creation();
        });
    });
});


function account_creation(){
    //remove the log in and new account buttons
    $(".footer_buttons").empty();
    //add on the submit buttons
    $(".footer_buttons").append("<br><button id='submit_user' type='button' class='btn btn-success'>Submit</button>")
    //append new account creation form
    $("#modal_form").prepend("<span>Display Name</span><br><input class='display_name' type='text' name='display_name' required><br>");
    $("#modal_form").append("<span>Confirm Password</span><br><input class='password_confirm' type='password' name='password_confirm'><br>");
    $("#submit_user").click(function(){
        password_validation()
    });
};

function password_validation(){
    //check that the passwords match first
    let password = $(".password_input").val();
    let confirmation = $(".password_confirm").val();
    if(password===confirmation){
        form_validation(password);
    } else {
        $(".validation_message").text("The passwords do not match")
        $(".password_input, .password_confirm").click(function(){
            message_clear();
        });
    }
};

function form_validation(password){
    //first validate the password
    let regex =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(regex.test(password)){
        email_validation(password);
    } else {
        $(".validation_message").text("Your password must contain one number, one lowercase, one uppercase letter, and be at least six characters long");
        $(".password_input, .password_confirm").click(function(){
            message_clear();
        });
    }
};

function email_validation(password){
    let email = $(".email_input").val();
    let regex = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
    if(regex.test(email)){
        display_validate(email, password);
    } else {
        $(".validation_message").text("Please enter a valid email.");
        $(".email_input").click(function(){
            message_clear();
        });
    }
};

function display_validate(email, password){
    let regex = /^[\w\s]+$/;
    let display_name = $(".display_name").val();
    if(regex.test(display_name)){
        let user_data = new New_User(display_name, email, password);        
        submit_new_user(user_data);
    } else {
        $(".validation_message").text("Your display name may only contain alphanumeric characters.");
        $(".display_name").click(function(){
            message_clear();
        })
    }
};

function message_clear(){
    $(".validation_message").text("");  
};

function submit_new_user(user_data){
    console.log(user_data);
    $.ajax ({
        dataType: 'JSON',
        data: user_data,
        method:'POST',
        url: 'http://localhost:3001/user',
        success: (res)=>{
            //log the new user in
            log_in(res);
        },
        error: (xhr, ajaxOptions, thrownError)=>{
            console.log(xhr, thrownError);
        }
    });
};

function log_in(data){
    console.log(data);
}

function New_User(display_name, email, password){
    this.display_name = display_name,
    this.email = email,
    this.password = password
};