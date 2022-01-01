import {config, env} from '../../config.js';
import {vakansieService as remoteVakansieService} from './event.service.remote.js';
import {vakansieService as localVakansieService} from './event.service.local.js';

export {ServiceController}

const ServiceController = () => {

    const remoteURL = `http://${springServerName}:${springServerPort}${restPath}`;

    const remoteServices = {
        vakansieService: remoteVakansieService(remoteURL)
    }

    const localServices = {
        vakansieService: localVakansieService()
    }

    /**
     * @returns {ServiceController} Event Controller
     */
    return config.environment === env.LOCAL ? localServices : remoteServices
}
