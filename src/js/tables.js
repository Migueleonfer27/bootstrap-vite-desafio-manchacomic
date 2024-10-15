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
                                button.textContent = `${activitie._type}`;
                                button.draggable = true;
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
                                                <button type="button" class="btn bg-primary-person text-light" id="delete-${activitie._id}">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                const deleteButton = modal.querySelector(`#delete-${activitie._id}`);
                                deleteButton.addEventListener('click', () => {
                                    deleteActivitie(activitie._id);
                                    deleteButton.textContent = 'Actividad eliminada correctamente';
                                    deleteButton.classList.add('bg-success');
                                    const modalElement = new bootstrap.Modal(modal);
                                    modalElement.hide();
                                    document.body.removeChild(modal);
                                    document.querySelector(`#btn-${activitie._id}`).remove();
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