import './src/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { validateType, validateLocation, validateDate, addInputValidation, submitFormActivitie, deleteInfoForm } from './src/js/form';
import { getFromLocalStorage , insertActivitie } from './src/js/tables';

addInputValidation('#activitie-pick', validateType);
addInputValidation('#ubication-pick', validateLocation);
addInputValidation('#activitie-date', validateDate);
document.querySelector('#form').addEventListener('submit', submitFormActivitie);
document.querySelector('#resetBtn').addEventListener('click', deleteInfoForm);
insertActivitie(getFromLocalStorage());