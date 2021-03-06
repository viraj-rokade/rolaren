function cnf_pass_check()
{
  document.getElementById('reg_btn').disabled = true;
  document.getElementById('reg_btn').classList.add('disabled');
    let password = document.getElementById("message-5a14").value;
    let confirm_password = document.getElementById("text-78d6").value;

    if(password!=confirm_password) {
        document.getElementById("err_msg").innerHTML="Passwords Don't Match";      
    } 
    else
    {
        document.getElementById("err_msg").innerHTML="";
        document.getElementById('reg_btn').disabled = false;
        document.getElementById('reg_btn').classList.remove('disabled');
    }
}