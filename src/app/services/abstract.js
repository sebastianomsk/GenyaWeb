import { methods } from 'http-constants';
import axios from 'axios';
import P from 'bluebird';
import _ from 'lodash';

// const port = process.env.PORT || 24099;
const env = process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV;
export const baseUrl = process.env.REACT_APP_BASE_URL || 'http://107.20.85.175';

// eslint-disable-next-line no-console
console.log({
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
    NODE_ENV: process.env.NODE_ENV,
    env,
    baseUrl,
});

const defaultOptions = {
    crossDomain: true,
    normalize: true,
    json: true
};

const mapKeys = {
    baseUrl: 'baseURL',
    uri: 'url',
    qs: 'params',
    body: 'data'
};

class Service {
    constructor (name, basePath, options = {}) {
        this.serviceName = name;
        this.basePath = basePath || `:${name}`;
        this.baseUrl = baseUrl;
        this.r = axios.create(options);

        this.r.interceptors.request.use(
            config => {
                // const user = getUserByToken();
                // if (user.data) {
                //     // This data will be used in logs from cloudwatch
                //     // const extra = JSON.stringify({
                //     //     store: getStoreByStorage()?.name,
                //     //     idStore: getStoreByStorage()?.id,
                //     //     username: user?.data?.key,
                //     //     idUser: user?.data?.id,
                //     //     client: getStorage('headerExtra') || '{}', // needed to parseExtra(extra) in e.g. loanevents.js cuotitasstores MS
                //     // }) || '';
                //     // config.headers.extra = extra;
                //     // config.headers['x-steplix-trace-id'] = `${extra}, ${this.traceId()}`;
                // }
                return config;
            },
            error => P.reject(error)
        );
        this.r.interceptors.response.use(response => response, e => {
            // const origRequest = e.config;
            // const dataResponse = e?.response?.data;
            return Promise.reject(e);
        });
    }

    request (method, options) {
        return P.bind(this)
            .then(() => {
                return new P((resolve, reject) => {
                    // Get logged in user
                    // const user = getUserByToken();
                    // if (user && user.data) {
                    //     const token = user.data.token.access_token;
                    //     this.r.defaults.headers.common.Authorization = `Bearer ${token}`;
                    // }

                    const opts = this.prepareOptions(method, options);

                    if (!opts.json) {
                        this.r.defaults.headers['Content-Type'] = 'multipart/form-data';

                        if (opts.data.file) {
                            const file = new FormData();

                            file.append('filename', opts.data.file.name);
                            file.append('file', opts.data.file.blobFile);
                            opts.data = file;
                        }
                    }

                    return this.r
                        .request(opts)
                        .then(res => resolve(opts.raw ? res : res.data))
                        .catch(error => reject(error));
                });
            });
    }

    prepareOptions (method, options) {
        if (_.isString(options)) {
            options = {
                url: options,
            };
        }

        if (!_.startsWith(options.url, 'http')) {
            options.url = `${baseUrl}${options.url}`;
        }

        options.method = method || 'get';

        options = _.defaultsDeep({}, _.mapKeys(options, (value, key) => mapKeys[key] || key), defaultOptions);

        return options;
    }
}

_.each(_.map(methods, method => method.toLowerCase()), method => {
    Service.prototype[method] = function (options) {
        return this.request(method, options);
    };
});

export default Service;
