
function addToTable(event) {
    let inputs = document.querySelectorAll('form input');
    let table = document.querySelector('#products');
    
    let description = inputs[0].value;
    let quantity = inputs[1].value;

    let row = document.createElement('tr');
    row.innerHTML = '<td>' + description + '</td>';
    
    let tdQuantity = document.createElement('td');
    let quantityInput = document.createElement('input');

    quantityInput.setAttribute('value', quantity);
    quantityInput.addEventListener('keyup', function() {
        updateTotal();
    });

    let tdButton = document.createElement('td');
    let removeButton = document.createElement('input');

    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('value', 'Remove');

    removeButton.addEventListener('click', function() {
        row.remove();
        updateTotal();
    });

    tdQuantity.append(quantityInput);
    tdButton.append(removeButton);

    row.append(tdQuantity);
    row.append(tdButton);

    table.append(row);

    updateTotal();

    event.preventDefault();
}

function updateTotal() {
    let rows = document.querySelectorAll('#products > tr:not(:first-child)');
    let totalSpan = document.querySelector('#total');
    let total = 0;

    for (let row of rows) {
        total += Number(row.querySelector('td:nth-child(2) > input').value);
    }

    totalSpan.innerHTML = total;
}

let form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', addToTable);
