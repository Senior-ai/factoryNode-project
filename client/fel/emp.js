
async function getData() {
      const url = 'http://localhost:4000/employees';
      const resp = await fetch(url);
      const emps = await resp.json();
      const tbody = document.getElementById('tBody');
      tbody.innerHTML = '';
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
      loadDepartments();
  }

  function addEmp() {
    window.location.href = './addEmp.html';
  }

  async function loadDepartments() {
    const depUrl = 'http://localhost:4000/departments';
    const data = await fetch(depUrl);
    const deps = await data.json();
    const select = document.getElementById('deps');
  
    // Add "All Departments" option as default
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.text = 'All Departments';
    select.appendChild(allOption);
  
    // Add department options
    deps.forEach(function(dep) {
      const option = document.createElement('option');
      option.value = dep._id;
      option.text = dep.name;
      select.appendChild(option);
    });
  
    // Update employee table when a new department is selected
    select.addEventListener('change', async function() {
      const selectedDep = select.value;
      const url = selectedDep === 'all' ? 'http://localhost:4000/employees' : `http://localhost:4000/employees?departmentID=${selectedDep}`;
      const resp = await fetch(url);
      const emps = await resp.json();
     // console.log(emps);
      const tbody = document.getElementById('tBody');
      tbody.innerHTML = '';
  
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
  
      // Reload the table
      reloadTable();
    });
  }
  
  async function reloadTable() {
    const selectedDep = document.getElementById('deps');
    const selectedOption = selectedDep.selectedOptions[0];
    const tBody = document.getElementById('tBody');
  
    const tableRows = tBody.getElementsByTagName('tr');
    for (let i = 0; i < tableRows.length; i++) {
      const departmentCell = tableRows[i].getElementsByTagName('td')[1];
      if (selectedOption.textContent === 'All Departments' || departmentCell.textContent === selectedOption.textContent) {
        tableRows[i].style.display = '';
      } else {
        tableRows[i].style.display = 'none';
      }
      
    }
  }
  