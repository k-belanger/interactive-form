# Interactive Form
### Project 3 - Treehouse Full Stack JS TechDegree
by Kimberly Belanger<br/>
November 16, 2017


## Project Objective:
Add interactivity and validation to a form using JavaScript. 

## Project Functions:
- Focus is on first field when page loads.
- Input field appears if "other" is selected from job dropdown.
- Tshirt colors vary depending on the tshirt theme that is selected.
- Activities that occur at the same time as one selected are disabled.
- Total cost of activities updates as you select deselect options.
- Correct payment section is displayed based on selection from payment dropdown.
- Form does not submit until all required fields are filled in.
- Validate form:
    - name field is not blank
    - email field is formated as an email
    - at least one activity is selected
    - credit card number is a number between 10 and 16
    - zipcode is a 5 digit number
    - cvv is a 3 digit number
- On submit non-valid fields are indicated, if all fields are valid a success message is displayed.
- When JavaScript is disable the other job field and all payment methods are displayed

## Exceeds Expectations:
- The tshirt color option and label are hidden until a theme is selected.
- Credit card section displays different error messages depending on the type of error
    - if blank it reads "this field is required"
    - if invald because it is not a number, or is too long / short it reads "please enter a valid card number"
- Email field validation updates in real time as you type.

<br/>
<br/>
*The project was built using plain JavaScript. No jQuery was used.