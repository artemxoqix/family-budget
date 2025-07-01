fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#expensesTable tbody');
        const summaryDiv = document.getElementById('summary');

        let total = 0;
        const categoryTotals = {};

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${entry.дата}</td>
        <td>${entry.категорія}</td>
        <td>${entry.опис}</td>
        <td>${entry.сума} грн</td>
      `;
            tbody.appendChild(row);

            total += entry.сума;
            categoryTotals[entry.категорія] = (categoryTotals[entry.категорія] || 0) + entry.сума;
        });

        let summaryText = `Загальна сума витрат: ${total} грн<br><br>`;
        for (const [категорія, сума] of Object.entries(categoryTotals)) {
            summaryText += `${категорія}: ${сума} грн<br>`;
        }

        summaryDiv.innerHTML = summaryText;
    })
    .catch(error => {
        document.getElementById('summary').innerText = 'Помилка при завантаженні даних 😓';
        console.error(error);
    });
