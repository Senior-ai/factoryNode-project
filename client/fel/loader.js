
function userLoad() {
    console.log(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("accessToken") === null)
    {
        window.location.href = './home.html';
    }
    
    if (sessionStorage.getItem("username") === null)
    {
        document.getElementById("username").innerHTML = "Test username";
    }
    else
    {
        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
    }    
}

function actionCreate() {
    const actionUrl = 'http://localhost:4000/login/actions';
    
    const obj = {
        "userId": 2,
        "maxActions": 15,
        "date": "27/02/2023",
        "actionAllowed": 13
    }
    const resp = fetch(actionUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
}