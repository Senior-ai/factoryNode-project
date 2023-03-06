
async function userLoad() {
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
    
    if (await checkAction())
    {
        pathChecker();
    }
    if (!window.location.href.includes("edit") ||
    !window.location.href.includes("add")) {
        setUsername();
    }   
}

async function actionCreate() {
    const actionUrl = 'http://localhost:4000/actions/';
    const usersUrl = 'http://localhost:4000/users/'

    const _now = new Date();
    const day = _now.getDate().toString().padStart(2, '0');
    const month = (_now.getMonth() + 1).toString().padStart(2, '0'); // Note that month is zero-indexed
    const year = _now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const userId = sessionStorage.getItem("userId");
    const data = await fetch(usersUrl);
    const users = await data.json();
    const user = users.filter(u => u.userId == userId);
    console.log(userId)
    console.log(user);
    const obj = {
        "userId": parseInt(userId),
        "maxActions": user[0].maxActions, //y
        "date": currentDate,
        "actionAllowed": user[0].numOfActions - 1 //y
    }
    const resp = await fetch(actionUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
}

async function checkAction() {
    const usersUrl = 'http://localhost:4000/users/'

    const userId = sessionStorage.getItem("userId");
    const data = await fetch(usersUrl);
    const users = await data.json();
    const user = users.filter(u => u.userId == userId);
    if (user[0].numOfActions - 1 == 0)
        return true;
    else
        return false;
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
            window.location.href = './login.html';
            sessionStorage.clear();
        }
}

function setUsername() {
    if (sessionStorage.getItem("username") === null) //Supposed to never happen, but just in case
    {
        document.getElementById("username").innerHTML = "Test username";
    }
    else
    {
        document.getElementById("username").innerHTML = sessionStorage.getItem("username");
    } 
}