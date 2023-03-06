const url = 'http://localhost:4000/employees';

      const params = new URLSearchParams(location.search);
      const empId = params.get('empId');
        

      async function loadData() {
        const resp = await fetch(`${url}/${empId}`);
        const emp = await resp.json();

        document.getElementById('name').value = emp.firstName;
        document.getElementById('lastName').value = emp.lastName;
        document.getElementById('premieredYear').value = emp.startWorkYear;

        //Generate the Shifts table
        const shifts = emp.shifts;
        const table = document.getElementById('shiftTable');
        shifts.forEach(shift => {
            const tr = document.createElement('tr');
            //Id column
            const tdId = document.createElement('td');
            tdId.innerHTML(shift._id);
            tr.appendChild(tdId);
            // 'Date' column
            const tdDate = document.createElement('td');
            tdDate.innerHTML(shift.Date);
            tr.appendChild(tdDate);
            //'Hours' column
            const tdHours = document.createElement('td');
            tdHours.innerHTML(shift.StartingHour + ' - ' + shift.EndingHour);
            tr.appendChild(tdHours);
        });
        table.appendChild(tr);
      }

      async function updateEmp() {
        const obj = {
          name: document.getElementById('name').value,
          lastName: document.getElementById('lastName').value,
          premieredYear: document.getElementById('premieredYear').value,
        };

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
        for (const shift of emp.shifts)
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