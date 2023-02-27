// jwt = require('jsonwebtoken');

    //Simplest way to check if the user exists.
      const loginVerify = async () => {

        const loginData = {
          username: document.getElementById('typeUsername').value,
          email: document.getElementById('typeEmailX').value,
        };

        let query = Object.keys(loginData)
        .map(k => encodeURIComponent(k) + '=' +encodeURIComponent(loginData[k]))
        .join('&');
      
        const url = 'https://jsonplaceholder.typicode.com/users?' + query;
        const authUrl = 'http://localhost:4000/login';
    
        var res = await fetch(url);
        console.log(res);
        var content = await res.json();
        
        if (content[0]) //cuz it will return false if the credentials entered do not exist
        {
          const authRes = await fetch(authUrl);
          const token = await authRes.json();

          sessionStorage['generatedTime'] = Date();
          sessionStorage['accessToken'] = token.accessToken; //JWT
          sessionStorage['username'] = loginData.username;
          sessionStorage['userId'] = content[0].userId;
          
          console.log(token.accessToken);
          window.location.href = './home.html';
        }
        else
        {
          const errMsg = document.getElementById('errMsg');
        
          errMsg.textContent = 'Incorrect Credenetials!';
          errMsg.style.color = 'red';
        }
      };