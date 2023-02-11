
document.addEventListener("DOMContentLoaded", () => {
    async function getData() {
      const url = 'http://localhost:4000/shifts';
      const resp = await fetch(url);
      const emps = await resp.json();
      console.log(emps[0].Date);
      const tbody = document.getElementById('tBody');
  
      emps.forEach((emp) => {
        // table row
        const tr = document.createElement('tr');
        // 'ID' column
        const tdId = document.createElement('td');
        const idLink = document.createElement('a');
        idLink.href = `editShift.html?shiftId=${emp._id}`;
        idLink.innerHTML = emp._id;
        tdId.appendChild(idLink);
        
        // 'Date' column
        const tdName = document.createElement('td');
        const nameLink = document.createElement('a');
        tdName.innerHTML = emp.Date;
        // 'Hours' column
        const tdDir = document.createElement('td');
        tdDir.innerHTML = (emp.StartingHour + " - " + emp.EndingHour);
        // 'employees' column
        const tdEmp = document.createElement('td');
        if (emp.employees[0] !== undefined)
      {
        for (let i=0; i < emp.employees.length; i++)
        {
          console.log(emp.employees[i].firstName);
          const nameLink = document.createElement('a');
          nameLink.href = `../employee/editEmp.html?empId=${emp.employees[i]._id}`;
          nameLink.innerHTML = (emp.employees[i].firstName +" "+emp.employees[i].lastName); 
          tdEmp.appendChild(nameLink);
          
          if (i !== emp.employees.length - 1)
          {
            const comma = document.createElement('span');
            comma.innerHTML = ', ';
            tdEmp.appendChild(comma);
          }
        }
      } else {
        tdEmp.innerHTML = 'No Employees in this shift yet'
      }
  
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdDir);
        tr.appendChild(tdEmp);
  
        tbody.appendChild(tr);
      });
    }  getData();
  });

  function addEmp() {
    window.location.href = './addEmp.html';
  }