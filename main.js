import './src/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { insertActivitie } from './src/js/tables';
import { validateType, validateLocation, validateDate, addInputValidation, submitFormActivitie, deleteInfoForm } from './src/js/form';
import { getFromLocalStorage } from './src/js/localStorage';

addInputValidation('#activitie-pick', validateType);
addInputValidation('#ubication-pick', validateLocation);
addInputValidation('#activitie-date', validateDate);
document.querySelector('#form').addEventListener('submit', submitFormActivitie);
document.querySelector('#resetBtn').addEventListener('click', deleteInfoForm);
insertActivitie(getFromLocalStorage());