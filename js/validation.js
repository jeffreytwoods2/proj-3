/*
- I had to add a custom condition to set the error div of the checkboxes,
  since that error div is not a sibling of its input element.
- Also added custom regex for the zip code with more accurate functionality
*/
let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /^\d{5}(?:[-]\d{4})?$/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form=null;
let successMsg=null;
document.addEventListener("DOMContentLoaded", initValidation("myform", "success"))
function initValidation(formId, successId) {

  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (input of inputs) {
    input.addEventListener("change", inputChanged );
  }
  form.addEventListener("submit", submitForm );

}
function inputChanged(ev) {
  let el = ev.currentTarget;
  validateForm();
  el.classList.add('was-validated')
}

function submitForm(ev) {
  console.log("in submit");
  let form=ev.currentTarget;
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    for (const item of document.querySelectorAll("input")) {
      if (!item.classList.contains("was-validated")) {
        item.classList.add("was-validated")
      }
    }
   
  } else {
    document.getElementById("myform").style.display = "none"
    document.getElementById("success").style.display = "block"

  }

}


function validateForm() {

  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");
  
  if(checkRequired("state", "State is Required")){
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }
 
  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex)
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", `bad zip-code, use "#####" or "#####-####"`, zipCodeRegex)
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex)
  }
  checkRequired("newspaper", "you must select at least one!");

}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  let stateUpper = el.value.toUpperCase()
  if (stateAbbreviations.includes(stateUpper)) {
    valid = true
  }
 
  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  let valid = regex.test(document.getElementById(id).value)

  setElementValidity(id, valid, msg);
  return valid;

}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case 'text':
    case 'password':
      valid = el.value === "" ? false : true
      break;

    case 'checkbox':
      for (const item of document.querySelectorAll("[name='find-page'")) {
        if (item.checked) {
          valid = true
          break
        }
      }
  }
  setElementValidity(id, valid, message);
  

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);

  if (valid) {
    el.setCustomValidity('');
  } else {
    el.setCustomValidity(message);
  }
  if (el.name === "find-page") {
    document.getElementById("check-err").innerText = valid ? "" : message
  } else {
    el.nextElementSibling.innerText = valid ? "" : message
  }

}