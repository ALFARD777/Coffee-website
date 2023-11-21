function checkAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/checkadmin.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText != 1) {
                window.location = "index.html";
            }
        }
    };
    xhr.send();
}

function getCallRequests(type) {
    var xhr = new XMLHttpRequest();
    if (type === 'Active') xhr.open('GET', "php/callrequests.php", true);
    else xhr.open('GET', "php/allcallrequests.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var displayString = "";
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                displayString += row[0] + " // " + row[1] + " // " + row[2] + " // " + row[3] + "\n";
            }
            if (type === 'Active') {
                if (displayString === "") alert("Запросов на звонок не найдено.");
                else alert("Актуальные звонки:\n" + displayString);
            }
            else alert("Все звонки:\n" + displayString);
        }
    };
    xhr.send();
}

function getNumberByID() {
    var userInput = prompt("Введите ID:");
    if (userInput !== null) {
        parseNumber(userInput);
    }
}

function parseNumber(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "php/parsenumber.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText != "") {
                var data = JSON.parse(xhr.responseText);
                alert("Имя: " + data.name + "\nНомер телефона: " + data.phone);
            }
            else {
                alert("Введенный ID не найден.");
            }
        }
    };
    xhr.send("id=" + id);
}

function ordersUpdate() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/updateorder.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            var userOrders = JSON.parse(response);
            updateTable(userOrders);
        }
    };
    xhr.send();
}

function updateTable(userOrders) {
    var table = {};
    userOrders.forEach(function (orderItem) {
        var productName = orderItem.product_name;
        if (table[productName]) {
            table[productName].quantity++;
        } else {
            table[productName] = {
                id: orderItem.user_id,
                quantity: 1,
                price: orderItem.price
            };
        }
    });
    var tbody = document.querySelector("#paginatedTable tbody");
    tbody.innerHTML = "";
    var sum = 0;
    for (var productName in table) {
        var row = tbody.insertRow();
        var idCell = row.insertCell(0);
        var nameCell = row.insertCell(1);
        var quantityCell = row.insertCell(2);
        var priceCell = row.insertCell(3);
        var actionCell = row.insertCell(4);

        idCell.textContent = table[productName].id;
        nameCell.textContent = productName;
        quantityCell.textContent = table[productName].quantity;
        priceCell.textContent = (table[productName].price * table[productName].quantity) + " BYN";
        actionCell.innerHTML = "<button id='completeOrderButton' class='btn verysmallbtn' data-text='" + productName + ":" + table[productName].id + "'><i class='fas fa-check'></i></button>";
        actionCell.classList.add("center");
        sum += table[productName].price * table[productName].quantity;
    }
    var completeOrderButtons = document.querySelectorAll("#completeOrderButton");
    completeOrderButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var buttonText = this.getAttribute("data-text");
            var arrayButtonText = buttonText.split(":");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "php/completeorder.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    var response = xhr.responseText;
                    if (response === "success") {
                        window.location.reload();
                    }
                    else {
                        window.location.href = "/Coffee/notifications/fail.html";
                    }
                }
            };
            var data = "productName=" + arrayButtonText[0] + "&id=" + arrayButtonText[1];
            xhr.send(data);
        });
    });
}

checkAdmin();
ordersUpdate();