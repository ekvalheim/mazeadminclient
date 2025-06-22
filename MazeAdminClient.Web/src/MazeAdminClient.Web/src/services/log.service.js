import { fetch } from 'utils/http.util';
import config from 'infrastructure/config/config';

const logError = (postData) =>
  fetch(`${config.apiEndpoints.logService}/LogError`, 'POST', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).catch(error => error);

export default {
  logError,
};
