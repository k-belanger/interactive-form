/* *********************************************
------------- Set Focus on the first text field ------------- 
********************************************** */
document.getElementsByTagName('input')[0].focus();


/* *********************************************
------------- Job Role Section ------------- 
********************************************** */
const jobRole = document.getElementById('title');
const jobInput = document.getElementById('other-title');

// hide other job title field by default
jobInput.style.display = "none";

jobRole.addEventListener("change", () => {
    if (jobRole.value === "other" ) {
        jobInput.style.display = "block";
        jobInput.focus();
    } else {
        jobInput.style.display = "none"; 
    }
});


/* *********************************************
------------- T-Shirt Info Section ------------- 
********************************************** */
const themeSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const selectColorOpt = document.querySelector('#color option[value="default"]');
const colorLabel = document.querySelector('#colors-js-puns label');

// disable color options until theme is selected
if (themeSelect.value === "default") {
    colorSelect.style.visibility = "hidden";
    colorLabel.style.visibility = "hidden";
}

// function to show / hide color options based on shirt theme selected
const showColorOptions = (value) => {
    for (let i = 0; i < colorOptions.length; i++) {
        let option = colorOptions[i];
        option.style.display = "none";
        let attr = option.getAttribute('group');
        if (attr === value) {
            selectColorOpt.style.display = "block";
            selectColorOpt.selected = true;
            option.style.display = "block";  
        } else {
            option.style.display = "none";
        } 
    }
}

// determines what tshirt theme was selected
themeSelect.addEventListener('change', () => {
    if (themeSelect.value === "default") {
        colorLabel.style.visibility = "hidden";
        colorSelect.style.visibility = "hidden";
        selectColorOpt.selected = true;
    } else if (themeSelect.value === "js puns") {
        colorLabel.style.visibility = "visible";
        colorSelect.style.visibility = "visible";
        showColorOptions("js puns"); 
    } else if (themeSelect.value === "heart js") {
        colorLabel.style.visibility = "visible";
        colorSelect.style.visibility = "visible";
        showColorOptions("heart js");
    }
});


/* *********************************************
------------- Register for Activities Section ------------- 
/********************************************* */
const activities = document.querySelector('.activities');
const workshops = document.querySelectorAll('.activities label');

// calculate total cost functions
let totalPrice = 0;
const addPrice = (cost) => {
    return totalPrice += cost;  
}
const subtractPrice = (cost) => {
    return totalPrice -= cost;  
}

// create and show total cost in UI
const displayTotal = document.createElement('p');
displayTotal.innerText = "Total $" + totalPrice;
activities.appendChild(displayTotal);


// checked / un-checked function
activities.addEventListener('change', (e) => {    
    const labelText = e.target.parentNode.innerText;
    
     // gets the price of the workshop from the label text
    const price = parseInt(labelText.split("$")[1]);

    // gets the time the workshop takes place from the label text
    const textArray = labelText.split(/[—,]+/);
    let time = "";
    if (textArray.length === 3 ) {
        time = textArray[1];
    } else {
        time = null;
    }
   
    // if checkbox is checked
    if (e.target.checked === true) {
        // if any workshops that takes place at the same time as the one checked
        for (let i = 0; i < workshops.length; i++) { 
            if (workshops[i].textContent.includes(time) && workshops[i].firstElementChild.checked === false) {
                // disable it
                workshops[i].firstElementChild.disabled = true;
                workshops[i].style.opacity = "0.25";
            }    
        }

        addPrice(price); // add price of checked item

    } else { 
    // if checkbox is un-checked
        subtractPrice(price); // subtract price of the un-checked item
 
        // if any workshops that takes place at the same time as the one checked
        for (let i = 0; i < workshops.length; i++) {
            if (workshops[i].textContent.includes(time)) {
                // enable it
                workshops[i].firstElementChild.disabled = false;
                workshops[i].style.opacity = "1";
            }    
        }
    }

    displayTotal.innerText = "Total $" + totalPrice; // update total price of checked items in UI 
});


/* **********************************************
------------- Payment Section ------------- 
********************************************** */
const paymentType = document.getElementById('payment');
const paymentInfo = document.querySelectorAll(".paymentInfo");

// select credit card info by default
for (let i = 0; i < paymentInfo.length; i++) {
    if (paymentInfo[i].id === "creditcard") {
        paymentInfo[i].style.display = "block";
        paymentType.value = "creditcard";
    } else {
        paymentInfo[i].style.display = "none";
    }
}

// display/hide payment option according to option selected
paymentType.addEventListener('change', (e) => {
    for (let i = 0; i < paymentInfo.length; i++) {
        if (paymentInfo[i].id === e.target.value) {
            paymentInfo[i].style.display = "block";
        } else {
            paymentInfo[i].style.display = "none";
        }
    }
});


/* **********************************************
------------- Form Validation ------------- 
********************************************** */
const form = document.getElementById('form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const submitBtn = document.querySelector('button[type=submit]');
const checkboxes = document.querySelectorAll('.activities input[type=checkbox]');
const activitiesLegend = document.querySelector('.activities legend');
const ccField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');

// create and add error message
const createErrorMsg = (elem, string) => {
    const errorMsg = document.createElement('span');
    errorMsg.className = "errorMsg";
    errorMsg.innerText = "* " + string;
    elem.classList.add("error");
    elem.parentNode.insertBefore(errorMsg, elem);
}

// remove error message
const removeError = (elem) => {
    elem.classList.remove("error");
    elem.previousSibling.remove(); 
}

// validate name field
const validateName = () => {
    if (nameField.value === "" || nameField.value === " ") {
        if (!nameField.classList.contains("error")) {   
            createErrorMsg(nameField, "this field is required");
        }
        return false;
    } else {
        if (nameField.classList.contains("error")) {
            removeError(nameField);
        }
        return true;   
    }
}

// validate email field
const validateEmail = () => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(emailField.value)) {
        if (emailField.classList.contains("error")) {
            removeError(emailField);
        }
        return true;
    } else {
        if (!emailField.classList.contains("error")) {
            createErrorMsg(emailField, "please enter an email address");
        } else {
            emailField.previousElementSibling.innerText = '* please enter a valid email';
        }
        return false;
    }
}

// Validate Activities Checkboxes
const validateActivities = () => {
    let checked = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            checked++;
        } 
    }

    if (checked > 0) {
        if (activitiesLegend.classList.contains("error")) {
            removeError(activitiesLegend);
        }
        return true;  
    } else {
        if (!activitiesLegend.classList.contains("error")) {
            createErrorMsg(activitiesLegend, "Please select at least one activity.");
        }
        return false;
    }

}

// validate credit card number
const validateCreditCard = () => {
    const ccInput = ccField.value.replace(/\s/g, '');
   
    if (ccInput === "" || ccInput === " ") {
        if (!ccField.classList.contains("error")) {
            createErrorMsg(ccField, "this field is required");
        } else {
            ccField.previousElementSibling.innerText = '* this field is required';
        }
        return false;
    } else if (ccInput.length < 10 || ccInput.length > 16 || isNaN(ccInput)) {
        if (!ccField.classList.contains("error")) {
            createErrorMsg(ccField, "enter a valid card number");
        } else {
            ccField.previousElementSibling.innerText = '* enter a valid card number';
        }
        return false;
    } else {
        if (ccField.classList.contains("error")) {
            removeError(ccField);
        }
        return true;
    }
}

// validate zipCode
const validateZipcode = () => {
    if (zipField.value === "" || zipField.value === " ") {
        if (!zipField.classList.contains("error")) {
            createErrorMsg(zipField, "required");
        } else {
            zipField.previousElementSibling.innerText = '* required';
        }
        return false;
    } else if (zipField.value.length !== 5 || isNaN(zipField.value)) {
        if (!zipField.classList.contains("error")) {
            createErrorMsg(zipField, "error");
        } else {
            zipField.previousElementSibling.innerText = '* error';
        }
    } else {
        if (zipField.classList.contains("error")) {
            removeError(zipField);
        }
        return true;
    }
}

// validate cvv code
const validateCVV = () => {
    if (cvvField.value === "" || cvvField.value === " ") {
        if (!cvvField.classList.contains("error")) {
            createErrorMsg(cvvField, "required");
        } else {
            cvvField.previousElementSibling.innerText = '* required';
        }
        return false;
    } else if (cvvField.value.length !== 3 || isNaN(cvvField.value)) {
        if (!cvvField.classList.contains("error")) {
            createErrorMsg(cvvField, "error");
        } else {
            cvvField.previousElementSibling.innerText = '* error';
        }
     } else {
         if (cvvField.classList.contains("error")) {
             removeError(cvvField);
         }
         return true;
     }
 }

// validate email as you type
emailField.addEventListener('keypress', () => {
    const validEmail = validateEmail();
});

// validate payment
const validatePayment = () => {
    if (paymentType.value === "creditcard") {
        const validCreditCard = validateCreditCard();
        const validZipcode = validateZipcode();
        const validCVV = validateCVV();
        if (validCreditCard && validZipcode && validCVV) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

// validate form on sumbit 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validName = validateName();
    const validEmail = validateEmail();
    const validActivities = validateActivities();
    const validPayment = validatePayment();
    setTimeout(() => { 
        if (validName && validEmail && validActivities && validPayment) {
            const successModal = document.createElement('div');
            successModal.id = "successModal";
            successModal.innerText = "Registration Successful!";
            document.body.appendChild(successModal);
        }
    }, 250);
});
