export class Activitie {
    constructor(type, location, day, hour) {
        this.type = type;
        this.location = location;
        this.day = day;
        this.hour = hour;
    }

    get type() {
        return this._type;
    }

    set type(nuevoType) {
        this._type = nuevoType;
    }

    get location() {
        return this._location;
    }

    set location(nuevaLocation) {
        this._location = nuevaLocation;
    }

    get day() {
        return this._day;
    }

    set day(nuevoDay) {
        this._day = nuevoDay;
    }

    get hour() {
        return this._hour;
    }

    set hour(nuevaHour) {
        this._hour = nuevaHour;
    }
}