
function load() {
    console.log(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("username") === null)
    {
        document.getElementById("username").innerHTML = "Test - {username}";
    }
    else
    {
        let retrievedValue = sessionStorage.getItem("username");
        document.getElementById("username").innerHTML = retrievedValue;
    }    
}