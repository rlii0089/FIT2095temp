class Package {
    nameInitials = 'RL';
    
    constructor(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID) {
        this.packageID = this.generatePackageID();
        this.packageTitle = packageTitle;
        this.packageWeight = packageWeight;
        this.packageDestination = packageDestination;
        this.description = description || '';
        this.createdAt = new Date();
        this.isAllocated = isAllocated;
        this.driverID = driverID;
    }

    generatePackageID() {
        return `P${this.generateRandomLetters(3)}-${this.nameInitials}-${this.generateRandomDigits(3)}`;
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

module.exports = Package;
