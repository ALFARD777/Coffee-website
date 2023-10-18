function closeAbout() {
    document.getElementById("aboutpopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#about";
}
function openAbout() {
    document.getElementById("aboutpopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
}
function closeLatte() {
    document.getElementById("lattepopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openLatte() {
    document.getElementById("lattepopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function closeEspresso() {
    document.getElementById("espressopopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openEspresso() {
    document.getElementById("espressopopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function closeCapuccino() {
    document.getElementById("capuccinopopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openCapuccino() {
    document.getElementById("capuccinopopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function closeAmericano() {
    document.getElementById("americanopopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openAmericano() {
    document.getElementById("americanopopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function closeRaf() {
    document.getElementById("rafpopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openRaf() {
    document.getElementById("rafpopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function closeChili() {
    document.getElementById("chilipopup").classList.remove("open-popup");
    document.body.style.position = '';
    enableScroll();
    window.location.href = "#menu";
}
function openChili() {
    document.getElementById("chilipopup").classList.add("open-popup");
    document.body.style.position = 'fixed';
    disableScroll();
    window.location.href = "#menu";
}
function disableScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.body.style.position = 'fixed';
    document.body.style.top = -scrollTop + 'px';
    document.body.style.left = -scrollLeft + 'px';
}
function enableScroll() {
    var top = parseFloat(document.body.style.top);
    var left = parseFloat(document.body.style.left);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    window.scrollTo(-left, -top);
}

postButtons.forEach(function(button) {
    var postButtons = document.getElementById("tobasket");
    button.addEventListener("click", function () {
        var buttonText = this.getAttribute("data-text");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/addbasket.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        var data = "positionName=" + buttonText;
        xhr.send(data);
    });
});