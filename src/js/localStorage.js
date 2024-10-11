export const saveToLocalStorage = (activitie) => {
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activitie);
    localStorage.setItem('activities', JSON.stringify(activities));
};

export const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('activities')) || [];
};

const deleteActivitie = (id) => {
    getFromLocalStorage().filter(activity => activity._id !== id);
    localStorage.setItem('activities', JSON.stringify(activities));
    removeActivityFromUI(id);
};