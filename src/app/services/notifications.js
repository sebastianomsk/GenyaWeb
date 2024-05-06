import Service from './abstract';

class Notifications extends Service {
    constructor () {
        super('24000');
        // this.basePath = 'http://localhost:24000';
    }

    /**
     * Send an email
     */
    sendEmail (data) {
        return this.post({
            url: `${this.basePath}/notifications`,
            data
        });
    }
}

export default new Notifications();
