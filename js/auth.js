document.getElementById("logoutButton").addEventListener("click", function() {
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "auth.html";
});

function updateUserName() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/profile.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.name) {
                document.getElementById('userName').textContent = "Имя: " + response.name;
                if (response.isAdmin == 1 && window.location.href === "index.html") {
                    document.getElementById('adminButton').classList.remove('hidden');
                }
            }
        }
    };
    xhr.send();
}
function checkAuthorization() {
    var phoneCookie = getCookie("phone");
    var profileMenu = document.getElementById("profile");
    var profilePhone = document.getElementById("userPhone");
    var authButton = document.getElementById("authButton");
    if (phoneCookie) {
        updateUserName();
        phoneCookie = phoneCookie.replace("%2B", "+");
        phoneCookie = phoneCookie.replace("%28", "(");
        phoneCookie = phoneCookie.replace("%29", ")");
        profilePhone.textContent = "Номер телефона: " + phoneCookie;
        profileMenu.classList.remove("hidden");
    } else {
        authButton.classList.remove("hidden");
    }
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}
checkAuthorization();