const depUrl = 'http://localhost:4000/departments';
const empUrl = 'http://localhost:4000/employees';

async function loadDeps() {
  const resp = await fetch(depUrl);
  const deps = await resp.json();
  const select = document.getElementById('deps');

  deps.forEach((dep) => {
    const option = document.createElement('option');
    option.value = dep._id;
    option.text = dep.name;
    select.appendChild(option);
  });
}

async function addEmp() {
  const obj = {
    firstName: document.getElementById('name').value,
    lastName: document.getElementById('lastName').value,
    startWorkYear: document.getElementById('premieredYear').value,
    departmentID: document.getElementById('deps').value
  };

  const resp = await fetch(empUrl, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await resp.json();
  console.log(data);
  if (data)
  {
    updateDep(data._id);
    updateStatus();
  }
}

async function updateDep(data) {
  const depUrl = 'http://localhost:4000/departments';
  const selectedDepId = document.getElementById('deps').value;
  const selectedDepResp = await fetch (`${depUrl}/${selectedDepId}`);
  const selectedDep = await selectedDepResp.json();  
  selectedDep.employees.push(data); 

  const depResp2 = await fetch(`${depUrl}/${selectedDepId}`,{
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedDep),
        });
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