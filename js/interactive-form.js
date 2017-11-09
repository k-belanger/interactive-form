/**** Set Focus on the first text field ****/
document.getElementsByTagName('input')[0].focus();

/**** Job Role Section ****/
const jobRole = document.getElementById('title');

jobRole.addEventListener("change", () => {
    if (jobRole.value === "other" ) {
        const jobInput = document.createElement('input');
        jobInput.id = "other-title";
        jobInput.type = "text";
        jobInput.placeholder = "Your Job Role";
        jobRole.parentNode.appendChild(jobInput);
        jobInput.focus();
    }
});

/**** T-Shirt Info Section ****/
const themeSelectElm = document.getElementById('design');
const colorSelectElm = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const selectColorOpt = document.querySelector('#color option[value="default"]');

// disable color options until theme is selected
if (themeSelectElm.value === "default") {
    colorSelectElm.disabled = true;
}

// function to show / hide color options based on shirt theme selected
const showColors = (value) => {
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
themeSelectElm.addEventListener('change', () => {
    if (themeSelectElm.value === "default") {
        colorSelectElm.disabled = true;
        selectColorOpt.selected = true;
    } else if (themeSelectElm.value === "js puns") {
        colorSelectElm.disabled = false;
        showColors("js puns"); 
    } else if (themeSelectElm.value === "heart js") {
        colorSelectElm.disabled = false;
        showColors("heart js");
    }
});