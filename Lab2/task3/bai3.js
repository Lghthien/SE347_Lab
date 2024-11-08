let existingIds = []; // danh sách id hiện có

// Lấy danh sách điện thoại
fetch('https://api.restful-api.dev/objects')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        const detailsContent = document.getElementById('details-content');

        data.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            nameCell.addEventListener('click', () => {
                let details = `<strong>ID:</strong> ${item.id}<br>`;
                details += `<strong>Name:</strong> ${item.name}<br>`;
                if (item.data) {
                    Object.entries(item.data).forEach(([key, value]) => {
                        details += `<strong>${key}:</strong> ${value}<br>`;
                    });
                }
                detailsContent.innerHTML = details;
            });

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

            // thêm id vào trong danh sách
            existingIds.push(item.id);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// Thêm sản phẩm 
document.getElementById('add-product-button').addEventListener('click', () => {
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const color = document.getElementById('product-color').value;
    const capacity = document.getElementById('product-capacity').value;

    if (!id || !name) {
        alert('Please enter both ID and Name.');
        return;
    }

    // Kiểm tra id có trùng hay không
    if (existingIds.includes(Number(id))) {
        alert('Error: ID already exists. Please choose a different ID.');
        return;
    }

    // Tạo sản phẩm mới với ID đã nhập
    const newProduct = {
        id: Number(id),
        name: name,
        data: {
            color: color,
            capacity: capacity
        }
    };

    // Sử dụng phương thức POST để thêm mới sản phẩm
    fetch('https://api.restful-api.dev/objects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(addedProduct => {
            // Cập nhật lại bảng với sản phẩm mới
            const tableBody = document.querySelector('#data-table tbody');
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = addedProduct.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = addedProduct.name;

            nameCell.addEventListener('click', () => {
                let details = `<strong>ID:</strong> ${addedProduct.id}<br>`;
                details += `<strong>Name:</strong> ${addedProduct.name}<br>`;
                if (addedProduct.data) {
                    Object.entries(addedProduct.data).forEach(([key, value]) => {
                        details += `<strong>${key}:</strong> ${value}<br>`;
                    });
                }
                detailsContent.innerHTML = details;
            });

            row.appendChild(nameCell);

            const colorCell = document.createElement('td');
            const colorValue = addedProduct.data && addedProduct.data.color ? addedProduct.data.color : 'X';
            colorCell.textContent = colorValue;
            row.appendChild(colorCell);

            const capacityCell = document.createElement('td');
            const capacityValue = addedProduct.data && addedProduct.data.capacity ? addedProduct.data.capacity : 'X';
            capacityCell.textContent = capacityValue;
            row.appendChild(capacityCell);

            tableBody.appendChild(row);

            // Thêm ID mới vào mảng
            existingIds.push(newProduct.id);
        })
        .catch(error => console.error('Error adding product:', error));
});