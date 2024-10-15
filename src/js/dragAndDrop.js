import { updateToLocalStorage, getFromLocalStorage, saveToLocalStorage } from "./localStorage";

export const dragAndDrop = () => {
    loadActivities();
    const activityButtons = document.querySelectorAll('button[data-bs-toggle="modal"]');

    activityButtons.forEach(button => {
        button.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', button.id);
        });

        button.addEventListener('click', (e) => {
            const activityId = button.id.split('-')[1];
            openModalWithActivity(activityId);
        });
    });

    const tds = document.getElementsByTagName('td');
    
    Array.from(tds).forEach(td => {
        td.addEventListener('dragover', (e) => {
            e.preventDefault();
            td.classList.add('bg-secondary');
        });

        td.addEventListener('dragleave', (e) => {
            e.preventDefault();
            td.classList.remove('bg-secondary');
        });

        td.addEventListener('drop', (e) => {
            e.preventDefault();
            td.classList.remove('bg-secondary');
            const buttonId = e.dataTransfer.getData('text/plain');
            const button = document.getElementById(buttonId);

            if (button) {
                td.appendChild(button);
                const activityId = buttonId.split('-')[1];
                handleDrop(activityId, td);
            }
        });
    });
};

const handleDrop = (activityId, td) => {
    const activities = getFromLocalStorage();
    const activity = activities.find(activity => activity._id === parseInt(activityId));

    if (activity) {
        const newHour = td.parentElement.classList[0];
        const newDay = td.classList[0];

        if (activity._hour !== newHour || activity._day !== newDay) {
            activity._hour = newHour;
            activity._day = newDay;
        }
        updateToLocalStorage(activity);
    }
};

const loadActivities = () => {
    const activities = getFromLocalStorage();
    activities.forEach(activity => {
        const button = document.createElement('button');
        button.id = `btn-${activity._id}`;
        button.textContent = activity._type;
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#activityModal');
        button.setAttribute('draggable', 'true');
        const td = document.querySelector(`td[data-hour="${activity._hour}"][data-day="${activity._day}"]`);
        if (td) {
            td.appendChild(button);
        }
    });
};

const openModalWithActivity = (activityId) => {
    const activities = getFromLocalStorage();
    const activity = activities.find(activity => activity._id === parseInt(activityId));

    if (activity) {
        const modalTitle = document.querySelector(`#modal-header-${activityId}`);
        const modalBody = document.querySelector(`#modalLabel-body-${activityId}`);

        if (modalTitle && modalBody) {
            modalTitle.textContent = activity._type;
            modalBody.innerHTML = `
                <p>Hora: ${activity._hour}</p>
                <p>Día: ${activity._day}</p>
                <p>Ubicación: ${activity._location}</p>
            `;
        } else {
            console.error("No se encontraron los elementos del modal para la actividad con id:", activityId);
        }
    } else {
        console.error("Actividad no encontrada en localStorage con id:", activityId);
    }
};

