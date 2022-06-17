const signUpForm = document.querySelector('#sign-up');
const passwordToggle = document.querySelector('#password-toggle');
const password = document.querySelector('#password');
const passwordLength = document.querySelector('.password-length');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const closeIcon = document.querySelector('.fa-xmark');

// validate function
const validateInputs = (inputField, regex) => {
  if (!regex.test(inputField.value)) {
    inputField.classList.add('invalid');
    inputField.classList.remove('valid');
  } else {
    inputField.classList.remove('invalid');
    inputField.classList.add('valid');
  }
};

// regex pattern
const pattern = {
  firstname: /^[A-Z][a-z]{1,}$/,
  lastname: /^[A-Z][a-z]{1,}$/,
  email: /^([a-zA-Z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
};

// get all input fields function
const getInputs = () => {
  const inputs = document.querySelectorAll('#sign-up .form-control');
  return inputs;
};

// validate inputs on key up event
getInputs().forEach(input => {
  input.addEventListener('keyup', e => {
    validateInputs(e.target, pattern[input.attributes.name.value]);
  });
});

// close modal function
const closeModal = () => {
  modalWrapper.classList.add('hidden');
};

// modal toggle
closeIcon.addEventListener('click', closeModal);
modalWrapper.addEventListener('click', closeModal);

// submit
signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const validInputs = [];
  getInputs().forEach(input => {
    if (input.classList.contains('valid')) {
      validInputs.push(input);
    }

    if (validInputs.length === getInputs().length) {
      modalWrapper.classList.remove('hidden');
      e.target.reset();
      getInputs().forEach(input => input.classList.remove('valid'));
    }
  });
});

// toggle password
const toggleVisibility = () => {
  if (password.type === 'password') {
    password.type = 'text';
    passwordToggle.className = 'fa-solid fa-eye';
  } else {
    password.type = 'password';
    passwordToggle.className = 'fa-solid fa-eye-slash';
  }
};

// showing password length
password.addEventListener('keyup', () => {
  const html = `<span class="password-length">password length: ${password.value.length}</span>`;
  passwordLength.innerHTML = html;
});

// visibility toggle
passwordToggle.addEventListener('click', toggleVisibility);
