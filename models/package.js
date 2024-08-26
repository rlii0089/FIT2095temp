/**
 * Package class
 */
class Package {
    nameInitials = 'RL'; // Name: Raymond Li
    
    /**
     * Constructor for Package class
     * @param {string} packageTitle - Title of the package
     * @param {number} packageWeight - Weight of the package
     * @param {string} packageDestination - Destination of the package
     * @param {string} description - Description of the package
     * @param {boolean} isAllocated - Status of the package
     * @param {string} driverID - ID of the driver
     */
    constructor(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID) {
        this.packageID = this.generatePackageID();
        this.packageTitle = packageTitle;
        this.packageWeight = packageWeight;
        this.packageDestination = packageDestination;
        this.description = description || ''; // Default description to empty string if not provided
        this.createdAt = new Date();
        this.isAllocated = isAllocated;
        this.driverID = driverID;
    }

    /**
     * Generate a package ID
     * @returns {string} - The package ID
     */
    generatePackageID() {
        // Generate a package ID in the format PXXX-RL-YYY where X is a random digit, Y is a random letter
        return `P${this.generateRandomLetters(3)}-${this.nameInitials}-${this.generateRandomDigits(3)}`;
    }

    /**
     * Generate a random string of letters
     * @param {number} numberOfLetters - The number of letters to generate
     * @returns {string} - The random string of letters
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
     * Generate a random number
     * @param {number} numberOfDigits - The number of digits to generate
     * @returns {number} - The random number
     */
    generateRandomDigits(numberOfDigits) {
        return Math.floor(Math.random() * 10 ** numberOfDigits);
    }
}

module.exports = Package; // Export Package class
