

document.addEventListener("DOMContentLoaded", () => {
  async function getData() {
    const url = 'http://localhost:4000/departments';
    const resp = await fetch(url);
    const deps = await resp.json();
    const tbody = document.getElementById('tBody');

    deps.forEach((dep) => {
      // table row
      const tr = document.createElement('tr');

      // 'Name' column
      const tdName = document.createElement('td');
      const nameLink = document.createElement('a');

      nameLink.href = `editDep.html?depId=${dep._id}`;

      nameLink.innerHTML = dep.name;
      tdName.appendChild(nameLink);

      // 'manager' column
      const tdDir = document.createElement('td');
      tdDir.innerHTML = dep.manager;

      // 'premieredYear' column
      const tdEmp = document.createElement('td');
      tdEmp.innerHTML = dep.employees;

      tr.appendChild(tdName);
      tr.appendChild(tdDir);
      tr.appendChild(tdEmp);

      tbody.appendChild(tr);
    });
  }  getData();
});