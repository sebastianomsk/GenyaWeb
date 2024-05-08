import Service from './abstract';

class Notifications extends Service {
    constructor () {
        super('notifications');
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
