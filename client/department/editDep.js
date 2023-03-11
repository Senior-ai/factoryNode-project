
var url = 'http://localhost:4000/departments';
var empUrl = 'http://localhost:4000/employees';  
const empArr = []

const params = new URLSearchParams(location.search);
const depId = params.get('depId');    

async function loadData() {
const resp = await fetch(`${url}/${depId}`);
const dep = await resp.json();    
  document.getElementById('name').value = dep.name;
  var select = document.getElementById("manager-select");
  var empSelect = document.getElementById('emp-select');

  const empresp = await fetch(empUrl);
  const employees = await empresp.json();
  employees.forEach(function(employee) {
  var option = document.createElement("option");
  option.value = employee._id;
  option.text = employee.firstName + " " + employee.lastName;
  select.appendChild(option);
  });

  console.log(employees[0].departmentID._id);
  console.log(depId)
  const filteredEmployees = employees.filter(employee =>
  employee.departmentID._id !== depId);
  console.log(filteredEmployees);
  filteredEmployees.forEach(function(employee) {
      var option = document.createElement("option");
      option.value = employee._id;
      option.text = employee.firstName + " " + employee.lastName;
      empSelect.appendChild(option)
  });


}
function saveEmps() {
  const newEmp = document.getElementById('emp-select').value;
  const selectEmp = document.getElementById('emp-select');
  if (selectEmp.selectedIndex >= 0)
  {
    empArr.push(newEmp);
    const empName = selectEmp.options[selectEmp.selectedIndex].text;
    const text = document.getElementById('selectedEmps');
    text.innerHTML +=  empName + ', ';
    selectEmp.options[selectEmp.selectedIndex].remove();
  } 
}

async function updateDep() {
  //update Emp with the new department
  if (empArr.length > 0)
  {
    empArr.forEach(async function(e) {
      const empresp = await fetch(`${empUrl}/${e}`);
      const emp = await empresp.json();
      //can do it "faster" by fetching the whole list of employees and then filter it 
      //Although it will be way less efficient - O(n^2)
      //For next projects: GraphQL would be much easier to implement in these situations
        const empObj = {
          firstName: emp.firstName,
          lastName: emp.lastName,
          startWorkYear: emp.startWorkYear,
          departmentID: depId,
          shifts: emp.shifts
        };

      const empResp = await fetch(`${empUrl}/${e}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(empObj),
      });
    });
  }
    
  //update department
  const manager = document.getElementById('manager-select').value
    if (document.getElementById('manager-select').value == '')
    {
      manager = dep.managerId;
    }
    else {
      const emp = await fetch(`${empUrl}/${manager}`)
      const exDepId = emp.departmentID;
            const empObj = {
                firstName: emp.firstName,
                lastName: emp.lastName,
                startWorkYear: emp.startWorkYear,
                departmentID: depId
          }
          const empResp = await fetch(`${empUrl}/${manager}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(empObj),
          });

          const exDep = await fetch(`${url}/${exDepId}`);
          const exDepObj = {
            name: exDep.name,
            employees: exDep.employees
          }
          const depResp = await fetch(`${url}/${exDepId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(exDepObj)
          });   
    }
  const obj = {
    name: document.getElementById('name').value,
    managerId: manager,
  };
  obj.employees = [...dep.employees, empArr];
  const resp = await fetch(`${url}/${depId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await resp.json();
  console.log(data);
  updateStatus();
}

async function deleteDep() {
  const resp = await fetch(`${url}/${depId}`);
  const dep = await resp.json();    
  const delempArr = dep.employees;
  if (delempArr.length > 0)
  {
    empArr.forEach(async function(e) {
      const empresp = await fetch(`${empUrl}/${e}`);
      const emp = await empresp.json();
        const empObj = {
          firstName: emp.firstName,
          lastName: emp.lastName,
          startWorkYear: emp.startWorkYear,
        };

      const empResp = await fetch(`${empUrl}/${e}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(empObj),
      });
    });
  }
  const response = await fetch(`${url}/${depId}`, {
    method: 'delete',
  });
  updateStatus();
}

function updateStatus() {
  const success = document.createElement('span');
          success.className = "badge badge-success";
          success.innerHTML = 'Successfully updated!';
          const div = document.getElementById('div-form')
          div.appendChild(success);
          setTimeout(() => window.history.back(), 2500);
}