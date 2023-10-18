document.getElementById("logoutButton").addEventListener("click", function() {
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "auth.html";
});