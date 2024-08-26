/**
 * Class representing a Driver.
 */
class Driver {
    studentIDTwoDigits = 33; // Student ID: 33119937

    /**
     * Create a Driver.
     * @param {string} driverName - The name of the driver.
     * @param {string} driverDepartment - The department of the driver.
     * @param {string} driverLicence - The licence of the driver.
     * @param {boolean} driverIsActive - The status of the driver.
     */
    constructor(driverName, driverDepartment, driverLicence, driverIsActive) {
        this.driverID = this.generateDriverID();
        this.driverName = driverName;
        this.driverDepartment = driverDepartment;
        this.driverLicence = driverLicence;
        this.driverIsActive = driverIsActive;
        this.driverCreatedAt = new Date();
    }

    /**
     * Generate a driver ID.
     * @returns {string} The driver ID.
     */
    generateDriverID() {
        // Generate a driver ID in the format DXX-33-YYY where X is a random digit, Y is a random letter.
        return `D${this.generateRandomDigits(2)}-${this.studentIDTwoDigits}-${this.generateRandomLetters(3)}`;
    }

    /**
     * Generate a random string of letters.
     * @param {number} numberOfLetters - The number of letters to generate.
     * @returns {string} The random string of letters.
     */
    generateRandomLetters(numberOfLetters) {
        let randomLetters = '';
        let lettersChoices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < numberOfLetters; i++) {
            randomLetters += lettersChoices.charAt(Math.floor(Math.random() * lettersChoices.length)); // Append a random letter to the string of random letters
        }
        return randomLetters;
    }

    /**
     * Generate a random number.
     * @param {number} numberOfDigits - The number of digits to generate.
     * @returns {number} The random number
     */
    generateRandomDigits(numberOfDigits) {
        return Math.floor(Math.random() * 10 ** numberOfDigits);
    }
}

module.exports = Driver; // Export Driver class
