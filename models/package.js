class Package {
    constructor(packageTitle, packageWeight, packageDestination, description) {
        this.packageID = this.generatePackageID();
        this.packageTitle = packageTitle;
        this.packageWeight = packageWeight;
        this.packageDestination = packageDestination;
        this.description = description || '';
        this.createdAt = new Date();
        this.isAllocated = false;  // Default to not allocated
        this.driverID = null;  // Default to no driver assigned
    }

    generatePackageID() {
        let randomTwoLetters = '';
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 2; i++) {
            randomTwoLetters += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        let initials = 'RL';
        let randomThreeDigits = Math.floor(Math.random() * 1000);
        return `P${randomTwoLetters}-${initials}-${randomThreeDigits}`;
    }
}