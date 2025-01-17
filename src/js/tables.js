import { getFromLocalStorage } from './localStorage';

export const insertActivitie = (activities) => {
    activities.forEach(activitie => {
        let table = null;

        if (activitie._location === "gardens") {
            table = document.querySelector('#garden');
        } else if (activitie._location === "casino") {
            table = document.querySelector('#casino');
        } else if (activitie._location === "cave") {
            table = document.querySelector('#cave');
        }
        if (table) {
            const tbody = table.getElementsByTagName('tbody')[0];
            const trs = tbody.getElementsByTagName('tr');
            Array.from(trs).forEach(tr => {
                if (tr.classList.contains(activitie._hour)) {
                    Array.from(tr.getElementsByTagName('td')).forEach(day => {
                        if (day.classList.contains(activitie._day)) {
                            if (!document.querySelector(`#btn-${activitie._id}`)) {
                                const button = document.createElement('button');
                                button.setAttribute('type', 'button');
                                button.classList.add('btn', 'bg-primary-person', 'text-light', 'my-1', 'd-block', 'w-100');
                                button.setAttribute('data-bs-toggle', 'modal');
                                if (activitie._id == null) {
                                    button.setAttribute('data-bs-target', `#modal-${activitie._id + 1}`);
                                } else {
                                    button.setAttribute('data-bs-target', `#modal-${activitie._id}`);
                                }
                                button.textContent = `${activitie._title}`;
                                button.draggable = true;
                                button.classList.add('btn-person');
                                button.setAttribute('id', `btn-${activitie._id}`);
                                const modal = document.createElement('div');
                                modal.classList.add('modal', 'fade');
                                modal.id = `modal-${activitie._id}`;
                                modal.setAttribute('tabindex', '-1');
                                modal.setAttribute('aria-labelledby', `modalLabel-${activitie._id}`);
                                modal.setAttribute('aria-hidden', 'true');
                                modal.innerHTML = `
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div id="modal-header-${activitie._id}" class="modal-header">
                                                <h5 class="modal-title" id="modalLabel-${activitie._id}">${activitie._type}</h5>
                                                <button type="button" class="btn-close bg-primary-person" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div id="modalLabel-body-${activitie._id}" class="modal-body">
                                                <p>Ubicación: ${activitie._location}</p>
                                                <p>Hora: ${activitie._hour}</p>
                                                <p>Día: ${activitie._day}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn bg-primary-person btn-person text-light" aria-label="Close" data-bs-dismiss="modal" id="delete-${activitie._id}">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                const deleteButton = modal.querySelector(`#delete-${activitie._id}`);
                                deleteButton.addEventListener('click', () => {
                                    deleteActivitie(activitie._id);

                                });
                                day.appendChild(button);
                                document.body.appendChild(modal);
                            }
                        }
                    });
                }
            });
        }
    });
};

const deleteActivitie = (id) => {
    const activities = getFromLocalStorage();
    const updatedActivities = activities.filter(activity => activity._id !== id);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    updateUIAfterDeletion(id);
};

const updateUIAfterDeletion = (id) => {
    const button = document.querySelector(`#btn-${id}`);
    if (button) {
        button.remove();
    }
};

export const hideTable = () => {
    const btnGarden = document.querySelector('#btn-garden');
    const btnCasino = document.querySelector('#btn-casino');
    const btnCave = document.querySelector('#btn-cave');
    const tableGarden = document.querySelector('#container-garden');
    const tableCasino = document.querySelector('#container-casino');
    const tableCave = document.querySelector('#container-cave');

    btnGarden.addEventListener('click', () => {
        tableGarden.classList.remove('d-none');
        tableCasino.classList.add('d-none');
        tableCave.classList.add('d-none');
    });

    btnCasino.addEventListener('click', () => {
        tableGarden.classList.add('d-none');
        tableCasino.classList.remove('d-none');
        tableCave.classList.add('d-none');
    });

    btnCave.addEventListener('click', () => {
        tableGarden.classList.add('d-none');
        tableCasino.classList.add('d-none');
        tableCave.classList.remove('d-none');
    });
}

export const translate = (atribute) => {
    let translate = atribute;

    switch (atribute) {
        case 'talks':
            translate = "Charlas"
            break;

        case 'workshops':
            translate = "Talleres"
            break;

        case 'table-games':
            translate = "Juegos de mesa"
            break;

        case 'table-games':
            translate = "Juegos de mesa"
            break; 
        
        case 'wargames':
            translate = "Wargames"
            break;

        case 'rol-scape-room':
            translate = "Rol-scape-room"
            break;

        case 'gardens':
            translate = "Jardines"
            break;

        case 'casino':
            translate = "Casino"
            break;

        case 'cave':
            translate = "Cueva"
            break;
    }

    return translate;
}