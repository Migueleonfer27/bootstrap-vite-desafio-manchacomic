import { Activitie } from "./activitie";

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
                            const button = document.createElement('button');
                            button.setAttribute('type', 'button');
                            button.classList.add('btn', 'bg-primary-person', 'text-light', 'my-1', 'd-block');
                            button.setAttribute('data-bs-toggle', 'modal');
                            button.setAttribute('data-bs-target', `#modal-${activitie._id}`);
                            button.textContent = 'Ver actividad';
                            button.draggable = true

                            const modal = document.createElement('div');
                            modal.classList.add('modal', 'fade');
                            modal.id = `modal-${activitie._id}`;
                            modal.setAttribute('tabindex', 
                                                '-1',
                                                'aria-labelledby', 
                                                `modalLabel-${activitie._id}`,
                                                'aria-hidden', 
                                                'true');
                            modal.innerHTML = `
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="modalLabel-${activitie._id}">${activitie._type}</h5>
                                            <button type="button" class="btn-close bg-primary-person" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Ubicación: ${activitie._location}</p>
                                            <p>Hora: ${activitie._hour}</p>
                                            <p>Día: ${activitie._day}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn bg-primary-person text-light" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                            day.appendChild(button);
                            document.body.appendChild(modal);
                        }
                    });
                }
            });
        }
    });
};

export const getFromLocalStorage = () => {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    return activities;
};