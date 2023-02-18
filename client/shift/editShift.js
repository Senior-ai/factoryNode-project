
var url = 'http://localhost:4000/shifts';
var empUrl = 'http://localhost:4000/employees';  

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

      async function updateshift() {
        const obj = {
          name: document.getElementById('name').value,
          lastName: document.getElementById('lastName').value,
          premieredYear: document.getElementById('premieredYear').value,
        };

        const resp = await fetch(`${url}/${shiftId}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });

        const data = await resp.json();
        console.log(data);
      }

      async function deleteshift() {
        const response = await fetch(`${url}/${shiftId}`, {
          method: 'delete',
        });
      }