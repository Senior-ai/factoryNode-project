const url = 'http://localhost:4000/employees';
const shiftUrl = 'http://localhost:4000/shifts/';
      const params = new URLSearchParams(location.search);
      const empId = params.get('empId');
        

      async function loadData() {
        const resp = await fetch(`${url}/${empId}`);
        const emp = await resp.json();

        document.getElementById('name').value = emp.firstName;
        document.getElementById('lastName').value = emp.lastName;
        document.getElementById('premieredYear').value = emp.startWorkYear;
        const table = document.getElementById('shiftTable');
        loadShifts();
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
      }

      async function loadShifts() {
        
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

      async function updateEmp() {
        const shift = document.getElementById('shifts').value;
        
        const obj = {
          name: document.getElementById('name').value,
          lastName: document.getElementById('lastName').value,
          premieredYear: document.getElementById('premieredYear').value,
          shifts: []
        };
        if (shift !== 'default') {
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
        const updatedDepartment = department.filter(e => e.empId !== empId);
        const depResp2 = await fetch(`${depUrl}/${emp.departmentID}`,{
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedDepartment),
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
      }

      document.getElementById("back").addEventListener("click", function() {
        window.history.back();
      });