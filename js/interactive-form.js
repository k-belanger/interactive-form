/* ------------- Set Focus on the first text field ------------- */
document.getElementsByTagName('input')[0].focus();

/* ------------- Job Role Section ------------- */
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

/* ------------- T-Shirt Info Section ------------- */
const themeSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const selectColorOpt = document.querySelector('#color option[value="default"]');

// disable color options until theme is selected
if (themeSelect.value === "default") {
    colorSelect.disabled = true;
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
        colorSelect.disabled = true;
        selectColorOpt.selected = true;
    } else if (themeSelect.value === "js puns") {
        colorSelect.disabled = false;
        showColorOptions("js puns"); 
    } else if (themeSelect.value === "heart js") {
        colorSelect.disabled = false;
        showColorOptions("heart js");
    }
});

/* ------------- Register for Activities Section ------------- */