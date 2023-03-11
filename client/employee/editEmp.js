const url = 'http://localhost:4000/employees';
const shiftUrl = 'http://localhost:4000/shifts/';
const depUrl = 'http://localhost:4000/departments/'
      const params = new URLSearchParams(location.search);
      const empId = params.get('empId');
        

async function loadData() {
  const resp = await fetch(`${url}/${empId}`);
  const emp = await resp.json();

  document.getElementById('name').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('premieredYear').value = emp.startWorkYear;
  const table = document.getElementById('shiftTable');
  if (emp.shifts[0] !== null)
  {
    for (let i=0; i < emp.shifts.length; i++)
    {
      //console.log(emp);
      const tr = document.createElement('tr');
      //Id column
      const tdId = document.createElement('td');
      const text = document.createElement('a');
      text.innerHTML = emp.shifts[i]._id;
      tdId.appendChild(text);
      tr.appendChild(tdId);
      // 'Date' column
      const tdDate = document.createElement('td');
      const dateText = document.createElement('a');
      dateText.innerHTML = emp.shifts[i].Date;
      tdDate.appendChild(dateText)
      tr.appendChild(tdDate);
      //'Hours' column
      const tdHours = document.createElement('td');
      const hourText = document.createElement('a');
      hourText.innerHTML = (emp.shifts[i].StartingHour + ' - ' + emp.shifts[i].EndingHour);
      tdHours.appendChild(hourText);
      tr.appendChild(tdHours);
      table.appendChild(tr);
    }
  }
  else 
  {
    const text = 'N/A';
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.appendChild(text);
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.appendChild(text);
    tr.appendChild(td2);
    const td3 = document.createElement('td');
    td3.appendChild(text);
    tr.appendChild(td3);
    table.appendChild(tr);
  }
  loadShifts(emp);
  loadDeps();
}

async function loadShifts(emp) {
  
  const resp = await fetch(shiftUrl);
  const shifts = await resp.json();
  const select = document.getElementById('shifts');
  console.log(shifts);
  shifts.forEach((shift) => {
    if (!emp.shifts.some((s) => s._id === shift._id)) {
    const option = document.createElement('option');
    option.value = shift._id;
    option.text = shift.Date + ': ' + shift.StartingHour + '-'+shift.EndingHour;
    select.appendChild(option);
    }
  });
}

async function loadDeps() {
  const resp = await fetch(depUrl);
  const deps = await resp.json();
  const depSelect = document.getElementById('dep-select');
  deps.forEach((dep) => {
    const option = document.createElement('option');
    option.value = dep._id;
    option.text = dep.name;
    depSelect.appendChild(option);
  })
}
async function updateEmp() {
  const depId = document.getElementById('dep-select').value; 
  const obj = {
    firstName: document.getElementById('name').value,
    lastName: document.getElementById('lastName').value,
    startWorkYear: document.getElementById('premieredYear').value,
    departmentID: depId
  };

  const shift = document.getElementById('shifts').value;
  if (shift !== 'default') { //Updating the shift with a new emp
    obj.shifts.push(shift);
    const shiftResp = await fetch(`${shiftUrl}/${shift}`);
    const shiftJson = await shiftResp.json();
    shiftJson.employees.push(empId);

    const shiftResp2 = await fetch(`${shiftUrl}/${shift}`,{
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shiftJson),
    });
  }
  const _depResp = await fetch(`${depUrl}/${depId}`);
  const department = await _depResp.json();
  department.employees.push(empId);
  const depResponse = await fetch(`${depUrl}/${depId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(department),
  });
  //Updating the emp itself
  const resp = await fetch(`${url}/${empId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await resp.json();
  console.log(data);
}

async function deleteEmp() {
  const depUrl = 'http://localhost:4000/departments'
  const shiftUrl = 'http://localhost:400/shifts'
  const resp = await fetch(`${url}/${empId}`);
  const emp = await resp.json();
  //Removing the emp from the department.
  const depResp = await fetch(`${depUrl}/${emp.departmentID}`);
  const department = await depResp.json();
  department.employees = department.employees.filter(e => e._id !== empId);
  const depResp2 = await fetch(`${depUrl}/${emp.departmentID}`,{
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(department),
  });
  //Same with the shifts - 
  for (const shift of emp.shifts) //Deletes the emp from the shift
  {
    const shiftResp = await fetch(`${shiftUrl}/${shift._id}`);
    const shiftData = await shiftResp.json();
    shiftData.employees = shiftData.employees.filter(
    (e) => e._id !== empId);

    await fetch(`${shiftUrl}/${shift._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(shiftData),
    });
  }
  //Literally deletes the employee
  const response = await fetch(`${url}/${empId}`, {
    method: 'delete',
  });
  updateStatus();
}

document.getElementById("back").addEventListener("click", function() {
  window.history.back();
});

function updateStatus() {
  const success = document.createElement('span');
          success.className = "badge badge-success";
          success.innerHTML = 'Successfully updated!';
          const div = document.getElementById('div-form')
          div.appendChild(success);
          setTimeout(() => window.history.back(), 2500);
}