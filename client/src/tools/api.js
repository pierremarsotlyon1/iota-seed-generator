/*
    Create by Pierre Marsot on 05/02/2018
*/
import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';

superagentJsonapify(superagent);

export function get(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url)
            .end((error, response) => {
                if (error) {
                    return reject({
                        error: 'Error connecting to the server'
                    });
                }

                if (response.ok && response.body) {
                    return resolve(response.body);
                }

                return reject({
                    error: 'Error connecting to the server'
                });
            });
    });
}