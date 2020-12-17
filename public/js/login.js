var signUpButton = document.getElementById("signUp");
var signInButton = document.getElementById('signIn');
var container = document.getElementById('container2');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// document.getElementById("signinbut").addEventListener("click", adminrights);
function adminrights()
{
signinname= document.getElementById("signinname").value;
signinpass=document.getElementById("signinpass").value;


if(signinname=="admin@gmail.com"&&signinpass=="admin")
{
	document.getElementById("signinform").action="/admin"
}
else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(signinname)))
{
alert("invalid email")
}
else 
{
	document.getElementById("signinform").action="/sin"
}
}


// document.getElementById("signupform").action="";
// document.getElementById("signupbut").addEventListener("click", validation);

// signupemail=document.getElementById("signupemail").value;
// signuppsw=document.getElementById("signuppsw");
// signupcpsw=document.getElementById("signupcpsw");


function validation()
{


	err1="";
	err2="";
	err3="";
	err4="";
	err5="";


	signupname=(document.getElementById("signupname"))
	signupemail=(document.getElementById("signupemail").value);
	signuppsw=(document.getElementById("signuppsw").value);
	signupcpsw=document.getElementById("signupcpsw").value;
	console.log(signuppsw)
	v1=(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(signupemail))
	v2=(/\d/.test(signuppsw))
	v3=((signuppsw.length)>=8);
	v4=(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(signuppsw));
	v5=(signuppsw==signupcpsw)
	console.log(v1,v2,v3,v4,v5)
	if(signuppsw&&signupcpsw&&signupemail){
	if(!v1)
		{
			err1="invalid email";
		}

	if(!v2)
		{
			err2="passwords doesn't have digits";
		}

	if(!v3)
		{
			err3="password does not contain 8 chracters";
		}
	if(!v4)
		{
			err4="password does not contain special characters"
		}
	if(!v5)
	{
		err5="passwords does not match"
	}

	if(v1&&v2&&v3&&v4&&v5)
		{
		alert("Thanks for registering")
		return true
		
		}
	else
		{
		alert(err1+"\n"+err2+"\n"+err3+"\n"+err4+"\n"+err5)
		return false
		}
	}
	else
	{
		alert("fields are empty")
		return false
	}
}