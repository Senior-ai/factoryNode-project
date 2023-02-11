
document.addEventListener("DOMContentLoaded", () => {
  async function getData() {
    const url = 'http://localhost:4000/departments';
    const resp = await fetch(url);
    const deps = await resp.json();
    //console.log(deps[1].employees);
    const tbody = document.getElementById('tBody');

    deps.forEach((dep) => {
      // table row
      const tr = document.createElement('tr');

      // 'Name' column
      const tdName = document.createElement('td');
      const nameLink = document.createElement('a');

      nameLink.href = `editDep.html?depId=${dep._id}`;

      nameLink.innerHTML = dep.name;
      tdName.appendChild(nameLink);

      // 'manager' column
      const tdDir = document.createElement('td');
      if (dep.managerId && dep.managerId.firstName) {
        tdDir.innerHTML = (dep.managerId.firstName +" "+ dep.managerId.lastName);
      } else {
        tdDir.innerHTML = 'N/A';
      }

      // 'employees' column
      const tdEmp = document.createElement('td');
      if (dep.employees[0] !== undefined)
      {
        for (let i=0; i < dep.employees.length; i++)
        {
          console.log(dep.employees[i].firstName);
          const nameLink = document.createElement('a');
          nameLink.href = `../employee/editEmp.html?empId=${dep.employees[i]._id}`;
          nameLink.innerHTML = (dep.employees[i].firstName +" "+dep.employees[i].lastName);
          tdEmp.appendChild(nameLink);
          
          if (i !== dep.employees.length - 1)
          {
            const comma = document.createElement('span');
            comma.innerHTML = ', ';
            tdEmp.appendChild(comma);
          }
        }
      } else {
        tdEmp.innerHTML = 'No Employees in this department yet'
      }

      tr.appendChild(tdName);
      tr.appendChild(tdDir);
      tr.appendChild(tdEmp);

      tbody.appendChild(tr);
    });
  }  getData();
});

function addDep() {
  window.location.href = './addDep.html';
}
