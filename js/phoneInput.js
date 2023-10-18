document.getElementById("phone").addEventListener("focus", function (e) {
    const phoneNumber = e.target;
    if (phoneNumber.value.length < 5) {
        phoneNumber.value = '+375(';
    }
});
document.getElementById("phone").addEventListener("input", function (e) {
    const phoneNumber = e.target;
    currentPhone = phoneNumber.value;
    if (phoneNumber.value.length < 5) {
        phoneNumber.value = '+375(';
    }
    else if (phoneNumber.value.length > 17) {
        phoneNumber.value = '';
        for (let i = 0; i < currentPhone.length - 1; i++) {
            phoneNumber.value += currentPhone[i];
        }
    }
    else if (phoneNumber.value.length === 6) {
        if (!(
            currentPhone[5] === '2' ||
            currentPhone[5] === '4' ||
            currentPhone[5] === '1'
        )) {
            phoneNumber.value = '';
            for (let i = 0; i < currentPhone.length - 1; i++) {
                phoneNumber.value += currentPhone[i];
            }
        }
    }
    else if (phoneNumber.value.length === 7) {
        if (!(
            (currentPhone[5] === '2' && currentPhone[6] === '9') ||
            (currentPhone[5] === '2' && currentPhone[6] === '5') ||
            (currentPhone[5] === '4' && currentPhone[6] === '4') ||
            (currentPhone[5] === '1' && currentPhone[6] === '7')
        )) {
            phoneNumber.value = '';
            for (let i = 0; i < currentPhone.length - 1; i++) {
                phoneNumber.value += currentPhone[i];
            }
        }
        else {
            phoneNumber.value += ')';
        }
    }
    else if (phoneNumber.value.length === 11) {
        phoneNumber.value += '-';
    }
    else if (phoneNumber.value.length === 14) {
        phoneNumber.value += '-';
    }
});