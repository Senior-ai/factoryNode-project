
document.addEventListener("DOMContentLoaded", () => {
    async function getData() {
      const url = 'http://localhost:4000/employees';
      const resp = await fetch(url);
      const emps = await resp.json();
      console.log(emps[1].employees);
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
        tdEmp.innerHTML = emp.shifts;
  
        tr.appendChild(tdName);
        tr.appendChild(tdDir);
        tr.appendChild(tdEmp);
  
        tbody.appendChild(tr);
      });
    }  getData();
  });