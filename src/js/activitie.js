export class Activitie {
    constructor(id, type, location, day, hour) {
        this._id = id;
        this._type = type;
        this._location = location;
        this._day = day;
        this._hour = hour;
    }

    get id() {
        return this._id;
    }

    set type(newId) {
        this._type = newId;
    }

    get type() {
        return this._type;
    }

    set type(newType) {
        this._type = newType;
    }

    get location() {
        return this._location;
    }

    set location(newLocation) {
        this._location = newLocation;
    }

    get day() {
        return this._day;
    }

    set day(newDay) {
        this._day = newDay;
    }

    get hour() {
        return this._hour;
    }

    set hour(newHour) {
        this._hour = newHour;
    }
}