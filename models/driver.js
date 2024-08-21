class Driver {
    constructor(driverName, driverDepartment, driverLicence) {
        this.driverID = this.generateDriverID();
        this.driverName = driverName;
        this.driverDepartment = driverDepartment;
        this.driverLicence = driverLicence;
        this.driverIsActive = true;
        this.driverCreatedAt = new Date();
    }

    generateDriverID() {
        let studentIDTwoDigits = 33
        let randomTwoDigits = Math.floor(Math.random() * 100);
        let randomThreeLetters = '';
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 3; i++) {
            randomThreeLetters += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return `D${randomTwoDigits}-${studentIDTwoDigits}-${randomThreeLetters}`;
    }
}