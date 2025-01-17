import './src/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { insertActivitie, hideTable } from './src/js/tables';
import { validateType, validateLocation, validateDate, addInputValidation, submitFormActivitie, deleteInfoForm, validateTitle } from './src/js/form';
import { getFromLocalStorage } from './src/js/localStorage';
import { dragAndDrop } from './src/js/dragAndDrop';

addInputValidation('#activitie-pick', validateType);
addInputValidation('#ubication-pick', validateLocation);
addInputValidation('#activitie-date', validateDate);
addInputValidation('#activitie-title', validateTitle);
document.querySelector('#form').addEventListener('submit', submitFormActivitie);
document.querySelector('#resetBtn').addEventListener('click', deleteInfoForm);
insertActivitie(getFromLocalStorage());
dragAndDrop();
hideTable();