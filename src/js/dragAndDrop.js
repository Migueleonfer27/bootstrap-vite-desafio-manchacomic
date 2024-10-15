import { updateToLocalStorage, getFromLocalStorage } from "./localStorage";

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
            const tableId = td.closest('table').id;
            const currentButtons = td.querySelectorAll('button[data-bs-toggle="modal"]').length;
            
            let limit = 0;
            switch (tableId) {
                case 'garden':
                    limit = 5;
                    break;
                case 'casino':
                    limit = 10; 
                    break;
                case 'cave':
                    limit = 2; 
                    break;
                default:
                    limit = 0; 
            }

            if (currentButtons >= limit) {
                td.classList.add('bg-danger');
            } else {
                td.classList.add('bg-success');
            }
        });

        td.addEventListener('dragleave', (e) => {
            e.preventDefault();
            td.classList.remove('bg-success', 'bg-danger');
        });

        td.addEventListener('drop', (e) => {
            e.preventDefault();
            td.classList.remove('bg-success', 'bg-danger');
            const buttonId = e.dataTransfer.getData('text/plain');
            const button = document.getElementById(buttonId);

            if (button) {
                const activityId = buttonId.split('-')[1];
                handleDrop(activityId, td, button);
            }
        });
    });
};

const handleDrop = (activityId, td, button) => {
    const activities = getFromLocalStorage();
    const activity = activities.find(activity => activity._id === parseInt(activityId));

    if (activity) {
        const newHour = td.parentElement.classList[0];
        const newDay = td.classList[0];
        const tableId = td.closest('table').id;
        const currentButtons = td.querySelectorAll('button[data-bs-toggle="modal"]').length;
        
        let limit = 0;
        switch (tableId) {
            case 'garden':
                limit = 5;
                break;
            case 'casino':
                limit = 10;
                break;
            case 'cave':
                limit = 2;
                break;
            default:
                limit = 0;
        }

        if (currentButtons < limit) {
            if (activity._hour !== newHour || activity._day !== newDay) {
                activity._hour = newHour;
                activity._day = newDay;
            }
            td.appendChild(button);
            updateToLocalStorage(activity);
        }
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
        }
    }
};
