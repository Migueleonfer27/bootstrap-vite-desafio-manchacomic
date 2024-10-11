import { Activitie } from './activitie';

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
    let valid = false;

    if (location.value === 'gardens') {
        valid = type.value === 'table-games';
    } else {
        valid = type.value !== 'table-games';
    }

    changeStyle(type, valid);

    return valid;
};

export const validateLocation = () => {
    const location = document.querySelector('#ubication-pick');
    const type = document.querySelector('#activitie-pick');
    let valid = false;

    if (type.value === 'table-games') {
        valid = location.value === 'gardens';
    } else {
        valid = location.value !== 'gardens' && location.value !== '';
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
            if ((parseInt(hour, 10) >= 10 && parseInt(hour, 10) <= 22) && parseInt(minute, 10) === 0) {
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

export const saveToLocalStorage = (activitie) => {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activitie);
    localStorage.setItem('activities', JSON.stringify(activities));
};

export const submitFormActivitie = (event) => {
    event.preventDefault();

    // Validar los campos del formulario
    if (validateType() && validateLocation() && validateDate()) {
        const type = document.querySelector('#activitie-pick').value;
        const location = document.querySelector('#ubication-pick').value;
        const datetimeValue = document.querySelector('#activitie-date').value;
        const [day, hour] = datetimeValue.split('T');
        const newActivitie = new Activitie(type, location, day, hour);
        const activities = JSON.parse(localStorage.getItem('activities')) || [];
        if (thereIsEspace(activities, newActivitie)) {
            saveToLocalStorage(newActivitie);
            document.querySelector('#formSuccess').classList.remove('d-none');
            document.querySelector('#formAlert').classList.add('d-none');
        } else {
            document.querySelector('#formAlert').classList.remove('d-none');
            document.querySelector('#formSuccess').classList.add('d-none');
            document.querySelector('#formAlert').textContent = 'No hay espacio disponible para esta actividad.';
        }
    } else {
        document.querySelector('#formAlert').classList.remove('d-none');
        document.querySelector('#formSuccess').classList.add('d-none');
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