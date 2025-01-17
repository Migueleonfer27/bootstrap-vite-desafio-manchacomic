import { Activitie } from './activitie';
import { saveToLocalStorage, getFromLocalStorage } from './localStorage';
import { insertActivitie } from './tables';
import { dragAndDrop } from './dragAndDrop';

const changeStyle = (element, isValid) => {
    if (isValid) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }
};

export const validateType = () => {
    const type = document.querySelector('#activitie-pick');
    const location = document.querySelector('#ubication-pick');
    let valid = true;

    if (location.value) {
        if (location.value === 'gardens') {
            valid = type.value === 'table-games';
        } else {
            valid = type.value !== 'table-games';
        }
    }

    changeStyle(type, valid);

    return valid;
};

export const validateTitle = () => {
    const title = document.querySelector('#activitie-title');
    let valid = title.value.length > 0;

    changeStyle(title, valid);

    return valid;
};

export const validateLocation = () => {
    const location = document.querySelector('#ubication-pick');
    const type = document.querySelector('#activitie-pick');
    let valid = true;

    if (type.value) {
        if (type.value === 'table-games') {
            valid = location.value === 'gardens';
        } else {
            valid = location.value !== 'gardens';
        }
    }

    changeStyle(location, valid);

    return valid;
};


export const validateDate = () => {
    const datetimeInput = document.querySelector('#activitie-date');
    const datetimeValue = datetimeInput.value;
    let valid = true;

    if (datetimeValue) {
        const [day, time] = datetimeValue.split('T');
        const [hour, minute] = time.split(':');

        if (day === '2025-10-03') {
            if ((parseInt(hour, 10) >= 17 && parseInt(hour, 10) <= 22) && parseInt(minute, 10) === 0) {
                valid = true;
            } else {
                valid = false;
            }
        } else if (day === '2025-10-04' || day === '2025-10-05') {
            if ((parseInt(hour, 10) >= 10 && parseInt(hour, 10) <= 21) && parseInt(minute, 10) === 0) {
                valid = true;
            } else {
                valid = false;
            }
        }
    } else {
        valid = false;
    }

    changeStyle(datetimeInput, valid);

    return valid;
};

export const addInputValidation = (selector, validationFunction) => {
    const inputElement = document.querySelector(selector);
    if (inputElement) {
        inputElement.addEventListener('input', () => {
            validationFunction();
        });
    }
};

export const submitFormActivitie = (event) => {
    event.preventDefault();

    if (validateTitle() && validateType() && validateLocation() && validateDate()) {
        const activities = getFromLocalStorage();
        const id = activities.length === 0 ? 1 : activities[activities.length - 1]._id + 1;
        const title = document.querySelector('#activitie-title').value;
        const type = document.querySelector('#activitie-pick').value;
        const location = document.querySelector('#ubication-pick').value;
        const datetimeValue = document.querySelector('#activitie-date').value;
        const [day, hour] = datetimeValue.split('T');
        const newActivitie = new Activitie(id, title, type, location, day, hour);

        if (thereIsEspace(activities, newActivitie)) {
            saveToLocalStorage(newActivitie);
            const successMessage = document.querySelector('#formSuccess');
            successMessage.classList.remove('d-none');
            document.querySelector('#formAlert').classList.add('d-none');
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 2000);
            insertActivitie(getFromLocalStorage());
            dragAndDrop();
        } else {
            const alertMessage = document.querySelector('#formAlert');
            alertMessage.classList.remove('d-none');
            document.querySelector('#formSuccess').classList.add('d-none');
            alertMessage.textContent = 'No hay espacio disponible para esta actividad.';
            setTimeout(() => {
                alertMessage.classList.add('d-none');
            }, 2000);
        }
    } else {
        const alertMessage = document.querySelector('#formAlert');
        alertMessage.classList.remove('d-none');
        document.querySelector('#formSuccess').classList.add('d-none');
        setTimeout(() => {
            alertMessage.classList.add('d-none');
        }, 2000);
    }
};


export const deleteInfoForm = () => {
    const inputs = document.querySelectorAll('#form input, #form select');

    document.querySelector('#formAlert').classList.add('d-none');
    document.querySelector('#formSuccess').classList.add('d-none');

    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });

    inputs.forEach(input => {
        if (input.tagName === 'INPUT') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        }
    });
};

export const thereIsEspace = (activities, newActivitie) => {
    const activitiesForSameTime = activities.filter(activity => {
        return activity._day === newActivitie._day &&
            activity._hour === newActivitie._hour &&
            activity._location === newActivitie._location;
    });
    const limits = {
        gardens: 5,
        casino: 10,
        cave: 2
    };
    const isSpaceAvailable = activitiesForSameTime.length < limits[newActivitie.location];

    return isSpaceAvailable;
};