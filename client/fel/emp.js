
document.addEventListener("DOMContentLoaded", () => {
    async function getData() {
      const url = 'http://localhost:4000/employees';
      const resp = await fetch(url);
      const emps = await resp.json();
      const tbody = document.getElementById('tBody');
  
      emps.forEach((emp) => {
        // table row
        const tr = document.createElement('tr');
  
        // 'Name' column
        const tdName = document.createElement('td');
        const nameLink = document.createElement('a');
  
        nameLink.href = `editEmp.html?empId=${emp._id}`;
  
        nameLink.innerHTML = emp.firstName + " "+emp.lastName; 
        tdName.appendChild(nameLink);
  
        // 'dep' column
        const tdDir = document.createElement('td');
        const depLink = document.createElement('a');
        depLink.href = `../department/editDep.html?depId=${emp.departmentID._id}`;
        depLink.innerHTML = (emp.departmentID.name);
        tdDir.appendChild(depLink);
        // 'shifts' column
        const tdEmp = document.createElement('td');
        if (emp.shifts[0] !== undefined)
        {
          for (let i=0; i < emp.shifts.length; i++)
          {
            const nameLink = document.createElement('a');
            nameLink.innerHTML = (`Shift No.${i+1}: `+emp.shifts[i].StartingHour +" - "+emp.shifts[i].EndingHour +", " + emp.shifts[i].Date); 
            tdEmp.appendChild(nameLink);

            if (i !== emp.shifts.length - 1)
            {
              const comma = document.createElement('br');
              tdEmp.appendChild(comma);
            }
          }
        }
        else {
          const text = document.createElement('a');
          text.innerHTML = 'Currently, there are no shifts to this employee'
          tdEmp.appendChild(text);
        }
      
  
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