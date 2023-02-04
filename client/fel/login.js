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
        var res = await fetch(url);
        console.log(res);
        var content = await res.json();
        
        if (content[0]) //cuz it will return false if the credentials entered do not exist
        {
          const userId = content[0].id; // find user's ID
          const ACCESS_SECRET_TOKEN = '13e235rfsdopsnaic'; //Usually, you will 
          
          // const accessToken = jwt.sign(
          //   { id: userId },
          //   ACCESS_SECRET_TOKEN,
          //   content[0].username,
          //   { expiresIn: 14400 } // expires after 14400ms (4 hours)
          // ); // Get Access Token
         // res.json({ accessToken });
         //res.json('success');
          sessionStorage['accessToken'] = content[0].accessToken; //JWT
          console.log(content[0].accessToken);
          //window.location.href = './home.html';
        }
        else
        {
            document.getElementById('') //Make the sentence variable to visible , TODO - add the elemnt in the html
          //add elemnt which warns that there are incorrect credentials
        }
      };