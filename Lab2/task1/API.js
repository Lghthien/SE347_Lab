fetch('https://api.restful-api.dev/objects')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');

        data.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const colorCell = document.createElement('td');
            const colorValue = item.data && (item.data.color || item.data.Color) ? (item.data.color || item.data.Color) : 'X';
            colorCell.textContent = colorValue;
            row.appendChild(colorCell);

            const capacityCell = document.createElement('td');
            const capacityValue = item.data && (item.data.capacity || item.data.Capacity) ? (item.data.capacity || item.data.Capacity) : 'X';
            capacityCell.textContent = capacityValue;
            row.appendChild(capacityCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));