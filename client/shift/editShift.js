
var url = 'http://localhost:4000/shifts';
var empUrl = 'http://localhost:4000/employees';  
const empArr = [];
const params = new URLSearchParams(location.search);
const shiftId = params.get('shiftId');        

async function loadData() {
  const resp = await fetch(`${url}/${shiftId}`);
  const shift = await resp.json();
  document.getElementById('date').value = shift.Date;
  document.getElementById('startingHour').value = shift.StartingHour;
  document.getElementById('endingHour').value = shift.EndingHour;
  var empSelect = document.getElementById('emp-select');
        
  const empresp = await fetch(empUrl);
  const employees = await empresp.json();
  
  
  const shiftEmployeeIds = shift.employees.map(employee => employee._id);
  const filteredEmployees = employees.filter(employee => !shiftEmployeeIds.includes(employee._id));
  console.log('filtered - '+ filteredEmployees);
  filteredEmployees.forEach(function(employee) {
      var option = document.createElement("option");
      option.value = employee._id;
      option.text = employee.firstName + " " + employee.lastName;
      empSelect.appendChild(option)
  });

}

async function updateShift() {
  const shiftResp = await fetch(`${url}/${shiftId}`);
  const shift = await shiftResp.json();
  const obj = {
    Date: document.getElementById('date').value,
    StartingHour: document.getElementById('startingHour').value,
    EndingHour: document.getElementById('endingHour').value,
  };
  obj.employees = [...shift.employees, empArr];
  const resp = await fetch(`${url}/${shiftId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await resp.json();
  const assignResp = await assignShift(shiftId);
  console.log(data);
  updateStatus();
}

async function assignShift(shiftId) {
  if (empArr.length > 0)
      {
        empArr.forEach(async function(e) {
          const empresp = await fetch(`${empUrl}/${e}`);
          const emp = await empresp.json();
          //can do it "faster" by fetching the whole list of employees and then filter it 
          //Although it will be way less efficient - O(n^2)
          //For next projects: GraphQL would be much easier to implement in these situations
          emp.shifts = [...emp.shifts, shiftId]
          const empResp = await fetch(`${empUrl}/${e}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emp),
          });
        });
      }
}

async function deleteshift() {
  const resp = await fetch(`${url}/${shiftId}`);
  const shift = await resp.json();
  const delempArr = shift.employees;
  if (delempArr.length > 0)
  {
    empArr.forEach(async function(e) {
      const empresp = await fetch(`${empUrl}/${e}`);
      const emp = await empresp.json();
      const index = emp.shifts.indexOf(shiftId);
      if (index !== -1) {
        const filteredShifts = emp.shifts.splice(index, 1); }
      emp.shifts = filteredShifts;

      const empResp = await fetch(`${empUrl}/${e}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(emp),
      });
    });
  }
  const response = await fetch(`${url}/${shiftId}`, {
    method: 'delete',
  });
  updateStatus();
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

function updateStatus() {
  const success = document.createElement('span');
          success.className = "badge badge-success";
          success.innerHTML = 'Successfully updated!';
          const div = document.getElementById('div-form')
          div.appendChild(success);
          setTimeout(() => window.history.back(), 2500);
}