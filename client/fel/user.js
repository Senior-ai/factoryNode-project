async function getData() {
      const url = 'http://localhost:4000/users';
      const resp = await fetch(url);
      const deps = await resp.json();
      const tbody = document.getElementById('tBody');
  
      deps.forEach((dep) => {
        // table row
        const tr = document.createElement('tr');
  
        // 'Name' column
        const tdName = document.createElement('td');
        tdName.innerHTML = dep.name;
  
        // 'max actions' column
        const tdDir = document.createElement('td');
          tdDir.innerHTML = (dep.maxActions);
  
        // 'employees' column
        const tdEmp = document.createElement('td');
        tdEmp.innerHTML = dep.numOfActions;
  
        tr.appendChild(tdName);
        tr.appendChild(tdDir);
        tr.appendChild(tdEmp);
  
        tbody.appendChild(tr);
      });
}