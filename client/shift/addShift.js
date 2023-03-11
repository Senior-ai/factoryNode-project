const url = 'http://localhost:4000/shifts';
const empUrl = 'http://localhost:4000/employees';  

async function addShift() {
  const obj = {
    Date: document.getElementById('date').value,
    StartingHour: parseInt(document.getElementById('startingHour').value),
    EndingHour: parseInt(document.getElementById('endingHour').value)
  };
  const resp = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = resp.json();
  console.log(data);
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