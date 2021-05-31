class Alert{
    constructor(message = 'Error', alertClass='danger'){
        this.message = message;
        this.alertClass = alertClass;
    }
}

module.exports = Alert;