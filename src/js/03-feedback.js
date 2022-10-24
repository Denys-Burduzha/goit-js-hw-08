const throttle = require('lodash.throttle');

const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector("input"),
    textarea: document.querySelector("textarea")
};
const formStorage = {};
const STORAGE_KEY = "feedback-form-state";
const getFormStorage = localStorage.getItem(STORAGE_KEY);

refs.form.addEventListener("input", throttle(setValueStorage, 500));
refs.form.addEventListener("submit", throttle(submitForm, 500))

function setValueStorage(event) {
    formStorage[event.target.name] = event.target.value;

    const valueStorageJSON = JSON.stringify(formStorage);
    localStorage.setItem(STORAGE_KEY, valueStorageJSON);
};

function submitForm(event) {
    event.preventDefault();

    console.log(formStorage);

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}


if (getFormStorage) {

    const getValueStorage = JSON.parse(getFormStorage);

    refs.input.value = getValueStorage.email;
    refs.textarea.value = getValueStorage.message;

    formStorage.email = getValueStorage.email;
    formStorage.message = getValueStorage.message;
}
