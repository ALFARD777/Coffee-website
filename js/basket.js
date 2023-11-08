var checkoutButton = document.getElementById("checkoutButton");
var paginationButtons = document.getElementById("paginationButtons");

window.addEventListener("scroll", function () {
    var buttonPosition = checkoutButton.getBoundingClientRect();
    if (buttonPosition.top < window.innerHeight && buttonPosition.bottom >= 0) {
        paginationButtons.style.display = "block";
    } else {
        paginationButtons.style.display = "none";
    }
});

function doOrder() {
    var phone = getCookie("phone");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/order.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            if (response === "success"){
                window.location = "/Coffee/notifications/success.html";
            }
            else {
                window.location = "/Coffee/notifications/fail.html";
            }
        }
    };
    var data = "phone=" + phone;
    xhr.send(data);
}

function basketUpdate() {
    var phone = getCookie("phone");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/updatebasket.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            var userBaskets = JSON.parse(response);
            updateTable(userBaskets);
        }
    };
    var data = "phone=" + phone;
    xhr.send(data);
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function updateTable(userBaskets) {
    var table = {};

    userBaskets.forEach(function (basketItem) {
        var productName = basketItem.product_name;
        if (table[productName]) {
            table[productName].quantity++;
        } else {
            table[productName] = {
                id: basketItem.user_id,
                quantity: 1,
                price: basketItem.price
            };
        }
    });
    var tbody = document.querySelector("#paginatedTable tbody");
    tbody.innerHTML = "";
    var sum = 0;
    for (var productName in table) {
        var row = tbody.insertRow();
        var nameCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        var priceCell = row.insertCell(2);
        var actionCell = row.insertCell(3);

        nameCell.textContent = productName;
        quantityCell.textContent = table[productName].quantity;
        priceCell.textContent = (table[productName].price * table[productName].quantity) + " BYN";
        actionCell.innerHTML = "<button id='deleteOrderButton' class='btn verysmallbtn' data-text='" + productName + ":" + table[productName].id + "'><i class='fas fa-trash'></i></button>"
        actionCell.classList.add("center");
        sum += table[productName].price * table[productName].quantity;
    }
    var costText = document.getElementById("costText");
    var checkoutButton = document.getElementById("checkoutButton");
    if (Object.keys(table).length > 0) {
        costText.classList.remove("hidden");
        checkoutButton.classList.remove("hidden");
    }
    else {
        costText.classList.add("hidden");
        checkoutButton.classList.add("hidden");
    }
    costText.textContent = "Итого: " + sum + " BYN";
}

basketUpdate();

var deleteOrderButtons = document.querySelectorAll("#deleteOrderButton");
console.log(deleteOrderButtons);
deleteOrderButtons.forEach(function (button) {
    console.log("ENTER CIKL");
    button.addEventListener("click", function () {
        console.log("ENTER");
        var buttonText = this.getAttribute("data-text");
        var arrayButtonText = buttonText.split(":");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/deleteposition.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                var response = xhr.responseText;
                if (response === "success") {
                    ordersUpdate();
                }
                else {
                    window.location.href = "/Coffee/notifications/fail.html";
                }
            }
        };
        var data = "positionName=" + arrayButtonText[0] + ";id=" + arrayButtonText[1];
        xhr.send(data);
    });
});