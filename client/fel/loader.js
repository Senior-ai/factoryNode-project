
function userLoad() {
    if (sessionStorage.getItem("accessToken") === null)
    {
      pathChecker();
      displayDialog('You have been logged out due to an invalid token');  
    } 
    else {
        const now = new Date();
        const timeObj = {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
        const storedTimeObj = JSON.parse(sessionStorage.getItem('expiredTime'));
        console.log('userLoad() - ' + timeObj.hour + 'timeObj.hour, now storedTime - ' + storedTimeObj.hour)
        if (timeObj.hour == storedTimeObj.hour)
        {
            if (timeObj.minute >= storedTimeObj.minute)
            {
                pathChecker();
                displayDialog('You were logged in for too long! Please log in if needed.');
            }
        }
        else if (timeObj.hour > storedTimeObj.hour)
        {
            pathChecker();
            displayDialog('You were logged in for too long! Please log in if needed.');
        }
    }
    
    if (checkAction() == true)
    {
       pathChecker();
       displayDialog('You have been logged out because you reached your daily limit of actions'); 
    }
    if (!window.location.href.includes("edit") &&
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
    if (user[0].numOfActions - 1 === 0)
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
            sessionStorage.clear();    
            window.location.href = '../login.html';
        }
        else
        {
            sessionStorage.clear();
            window.location.href = './login.html';
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

function displayDialog(text) {
    // create the dialog box content
    const dialogText = document.createElement('p');
    dialogText.innerText = 'You have been logged out due to inactivity';
  
    // create the dialog box container
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');
  
    // add the content to the dialog box container
    dialogContainer.appendChild(dialogText);
  
    // display the dialog box
    document.body.appendChild(dialogContainer);
  }