const url = 'http://localhost:4000/departments';
      const empUrl = 'http://localhost:4000/employees';  
      
      async function onLoad() {
        var select = document.getElementById("employee-select");
        const resp = await fetch(empUrl);
        const employees = await resp.json();
        employees.forEach(function(employee) {
        var option = document.createElement("option");
        option.value = employee._id;
        option.text = employee.firstName + " " + employee.lastName;
        select.appendChild(option);
    });
      }

      async function addDep() {
      const obj = {
          name: document.getElementById('name').value,
          managerId: document.getElementById('employee-select').value,
        };
        console.log(obj);
        const resp = await fetch(url, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });

        const data = resp.json();
        console.log(data);
        if (data)
        {
          const success = document.createElement('span');
          success.className = "badge badge-success";
          success.innerHTML = 'Successfully created!';
          const div = document.getElementById('div-form')
          div.appendChild(success);
          setTimeout(() => window.history.back(), 2500);
        }
      }

      document.getElementById("back").addEventListener("click", function() {
        window.history.back();
      });
      