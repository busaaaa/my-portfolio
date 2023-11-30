//Each form element we will get them by their id which we specified in the html file
const signin = document.getElementById('signin'); 
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
//Add an eventListener error on the form on the submit event
/*We call the e.preventdefault method on the event to prevent the form from submitting because we want 
to validate our inputs, to do that we will call the validationSignIn() inputs function.
*/
signin.addEventListener('submit', (e) => {
    validationSignIn();
 
    if(isFormValid() == true && login() == true){
        signin.submit();
    }else{
        e.preventDefault();
    }
 
 });
//In validateinputs, first step we need to get the value of all the inputs fields 
 function login() {
    const loginUsername = document.getElementById("loginUsername").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    // Check if loginUsername and loginPassword are not empty
    if (loginUsername && loginPassword) {
        // Retrieve data from local storage
        const storedData = JSON.parse(localStorage.getItem(loginUsername));

        // Check if the stored data exists and the password matches
        if (storedData && storedData.password === loginPassword) {
            alert("Login successfull!");
            return true;
        } else {
            alert("Invalid username or password");
            return false;
        }
    } else {
        alert("Please enter username and password");
        return false;   
    }
}

/* alphanumeric meaning
    (?=.*\d) //should contain at least one digit
    (?=.*[a-z]) //should contain at least one lower case
    (?=.*[A-Z]) //should contain at least one upper case
    [a-zA-Z0-9]{8,} //should contain at least 8 from the mentioned characters */

function validationSignIn(){
    const usernameValue = loginUsername.value.trim();    
    const passwordValue = loginPassword.value.trim();

    //username
    if(usernameValue === ''){
        setErrorFor(loginUsername, 'Username cannot be blank');
    }
    else if(usernameValue.length <=2){
        setErrorFor(loginUsername, 'Minimum of 3 characters');
    } 
    else if (usernameValue.search(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)){
        setErrorFor(loginUsername, 'Must be alphanumeric');
    }
    else {
        setSuccessFor(loginUsername);
    }
    
    //password
    if(passwordValue === ''){
        setErrorFor(loginPassword, 'Password cannot be blank');
    }
    else if(passwordValue.length <=7){
        setErrorFor(loginPassword, 'Minimum of 8 characters');
    }
    else if(passwordValue.search(/[0-9]/)==-1){
        setErrorFor(loginPassword, 'At least One number');
    }
    else if(passwordValue.search(/[a-z]/)==-1){
        setErrorFor(loginPassword, 'At least One Lowercase character');  
    }
    else if(passwordValue.search(/[A-Z]/)==-1){
        setErrorFor(loginPassword, 'At least One Uppercase character');
    }
    else if(passwordValue.search(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\<\>\?]/)==-1){
        setErrorFor(loginPassword, 'At least one Special character');
    }
    else {
        setSuccessFor(loginPassword);
    }
    return true;
    }

//the switching button of sign up to sign in.
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  container.classList.remove("active");
});


const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');


//TRY  
const exampleData = [
    {
    "username": "johndoe221",
    "password": "Password123!",
    "email": "johndoe@example.com",
    "firstName": "John",
    "lastName": "Doe"
    },
    {
      "username": "janedoe69",
      "password": "Password456!",
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe"
    },
    {
      "username": "petersmithxD",
      "password": "Password789!",
      "email": "petersmith@example.com",
      "firstName": "Peter",
      "lastName": "Smith"
    }
]

function saveObjectArrayToLocalStorage(key, objectArray) {
    var jsonString = JSON.stringify(objectArray);
    localStorage.setItem(key, jsonString);
}

for(let i = 0; i < exampleData.length; i++){
    saveObjectArrayToLocalStorage(exampleData[i].username, exampleData[i])
}


form.addEventListener('submit', (e) => {
     
    checkInputs();

    if(isFormValid()==true && register() == true){
      form.submit();
    }else{
      e.preventDefault();
    }
});
 

 
function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;

      
    let inputUser = {};

    inputUser.username = username,
    inputUser.password = password,
    inputUser.email = email,
    inputUser.firstName = firstname,
    inputUser.lastName = lastname;
     
    
    // Check if the username or email already exists
    if (isUserOrEmailExists(username, email)) {
        // Display an error message or take appropriate action
        alert('Username or email already exists. Please choose another.');
    } else {
        function saveObjectArrayToLocalStorage(key, objectArray) {
            var jsonString = JSON.stringify(objectArray);
            localStorage.setItem(key, jsonString);  
        }
        saveObjectArrayToLocalStorage(inputUser.username, inputUser)
        // Add the new user to the data 
        alert("Registration was successful, please login your account.");
        window.location.href = 'index.html';
    }
    // Function to check if username or email exists in local storage
function isUserOrEmailExists(username, email) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedData = JSON.parse(localStorage.getItem(key));
  
        if (
          storedData &&
          (storedData.username === username || storedData.email === email)
        ) {
          return true; // Username or email already exists
        }
      }
  
      return false; // Username and email do not exist
    }
}
 
//to know if the inputs is valid or not.
function isFormValid(){
    const inputContainers = form.querySelectorAll('.form-control');
    let result = true;
    inputContainers.forEach((container)=>{
      if(container.classList.contains('error')){
        result = false;
      }
    })
      return result;
  
  }
 
//e-mail validation
const isEmail = (emailValue) =>{
    var atSymbol = emailValue.indexOf('@');
    if(atSymbol < 1) return false;
    var dot = emailValue.lastIndexOf('.')
    if(dot <= atSymbol + 2) return false;
    if(dot === emailValue.length -1) return false;
    return true;
}

function checkInputs(){
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    //firstname
    if(firstnameValue === ''){
        setErrorFor(firstname, 'First name cannot be blank');
    }
    else if(firstnameValue.length <=2){
        setErrorFor(firstname, 'minimum of 3 characters');
    }
    else {
        setSuccessFor(firstname);
    }

    //lastname
    if(lastnameValue === ''){
        setErrorFor(lastname, 'Last name cannot be blank');
    }
    else if(lastnameValue.length <=2){
        setErrorFor(lastname, 'Minimum of 3 characters');
    }
    else {
        setSuccessFor(lastname);
    }

    //username
    if(usernameValue === ''){
        setErrorFor(username, 'Username cannot be blank');
    }
    else if(usernameValue.length <=2){
        setErrorFor(username, 'minimum of 3 characters');
    } else if (usernameValue.search(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)){
        setErrorFor(username, 'Must be alphanumeric'); 
    }
    else {
        setSuccessFor(username);
    }

    //email
    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank');
    }
    else if(!isEmail(emailValue)){ //get from email validation
        setErrorFor(email, 'Email is not valid');
    }
    else {
        setSuccessFor(email);
    }
 
    //password
    if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be blank');
    }
    else if(passwordValue.length <=7){
        setErrorFor(password, 'Minimum of 8 characters');
    }
    else if(passwordValue.search(/[0-9]/)==-1){
        setErrorFor(password, 'At least One number');
    }
    else if(passwordValue.search(/[a-z]/)==-1){
        setErrorFor(password, 'At least one lowercase character');  
    }
    else if(passwordValue.search(/[A-Z]/)==-1){
        setErrorFor(password, 'At least one uppercase character');
    }
    else if(passwordValue.search(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\<\>\?]/)==-1){
        setErrorFor(password, 'At least one Special character');
    }
    else {
        setSuccessFor(password);
    }
    return true;
    }
//if inputs is invalid it will show an error
function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    small.innerText = message;

    formControl.className = 'form-control error';
}
//if inputs is valid it will a success 
function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}