
function userLoad() {
    if (sessionStorage.getItem("accessToken") === null)
    {
        pathChecker();  
    } else {
        const now = new Date();
        const timeObj = {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
        const storedTimeObj = JSON.parse(sessionStorage.getItem('expiredTime'));

        if (timeObj.hour >= storedTimeObj.hour &&
        timeObj.minute >= storedTimeObj.minute)
        {
            pathChecker();
        }
    }
    
    if (!window.location.href.includes("edit") ||
    !window.location.href.includes("add")) {
        setUsername();
    }   
}

function actionCreate() {
    const actionUrl = 'http://localhost:4000/users/actions';
    const getActionUrl = 'http://localhost:400/users/getAction'

    const _now = new Date();
    const day = _now.getDate().toString().padStart(2, '0');
    const month = (_now.getMonth() + 1).toString().padStart(2, '0'); // Note that month is zero-indexed
    const year = _now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const userId = sessionStorage.getItem("userId");
    const actionsAllowed = fetch(getActionUrl);
    
    const obj = {
        "userId": userId,
        "maxActions": sessionStorage.getItem("maxActions"),
        "date": currentDate,
        "actionAllowed": actionsAllowed
    }
    const resp = fetch(actionUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
}

function logOut() {
    pathChecker();
    //TODO - Add a toast "You have logged out"
}

function pathChecker() {
    const currentPath = window.location.href;
    console.log('path- '+currentPath);
        if (currentPath.includes('client/department') || currentPath.includes('client/employee')
        || currentPath.includes('client/shift'))
        {
            window.location.href = '../login.html';
            sessionStorage.clear();    
        }
        else
        {
            sessionStorage.clear();
            window.location.href = './login.html';
        }
}

function setUsername() {
    if (sessionStorage.getItem("username") === null)
    {
        document.getElementById("username").innerHTML = "Test username";
    }
    else
    {
        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
    } 
}