/*
    Create by Pierre Marsot on 05/02/2018
*/
import {get} from '../tools/api';

export function generateSeed() {
    return new Promise((resolve, reject) => {
        get("http://localhost:1323")
            .then((body) => {
                if(body && body.seed){
                    return resolve(body.seed);
                }

                return reject("Error while recovering the seed.");
            })
            .catch((response) => {
                return reject(response.error);
            });
    });
}