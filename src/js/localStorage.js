export const saveToLocalStorage = (activitie) => {
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activitie);
    localStorage.setItem('activities', JSON.stringify(activities));
};

export const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('activities')) || [];
};

export const updateToLocalStorage = (updatedActivity) => {
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    // Actualiza la actividad existente
    activities = activities.map(activity => activity._id === updatedActivity._id ? updatedActivity : activity);
    localStorage.setItem('activities', JSON.stringify(activities));
};

export const deleteActivitie = (id) => {
    getFromLocalStorage().filter(activity => activity._id !== id);
    localStorage.setItem('activities', JSON.stringify(activities));
    removeActivityFromUI(id);
};