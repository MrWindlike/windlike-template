import request from '../utils/request';
import stringify from './stringify';

export default function createServices(services) {
  const newServices = {};

  Object.entries(services).map(([key, service]) => {
    if (typeof service === 'object') {
      if (service.method === 'GET' || service.method === 'DELETE') {
        newServices[key] = async params => request(`${service.url}?${stringify(params)}`, {
          method: service.method,
          headers: service.headers || {},
        });
      } else {
        const headers = service.headers ? ({
          'Content-Type': 'application/json;charset=utf-8',
          ...service.headers,
        }) : ({
          'Content-Type': 'application/json;charset=utf-8',
        });

        newServices[key] = async params => request(service.url, {
          method: service.method,
          headers,
          body: JSON.stringify({ ...service.params }),
        });
      }
    } else {
      newServices[key] = service;
    }
  });

  return newServices;
}
