class Driver {
    studentIDTwoDigits = 33;

    constructor(driverName, driverDepartment, driverLicence, driverIsActive) {
        this.driverID = this.generateDriverID();
        this.driverName = driverName;
        this.driverDepartment = driverDepartment;
        this.driverLicence = driverLicence;
        this.driverIsActive = driverIsActive;
        this.driverCreatedAt = new Date();
    }

    generateDriverID() {
        return `D${this.generateRandomDigits(2)}-${this.studentIDTwoDigits}-${this.generateRandomLetters(3)}`;
    }

    generateRandomLetters(numberOfLetters) {
        let randomLetters = '';
        let lettersChoices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < numberOfLetters; i++) {
            randomLetters += lettersChoices.charAt(Math.floor(Math.random() * lettersChoices.length));
        }
        return randomLetters;
    }

    generateRandomDigits(numberOfDigits) {
        return Math.floor(Math.random() * 10 ** numberOfDigits);
    }
}

module.exports = Driver;
