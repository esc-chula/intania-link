import axios from 'axios';

import { env } from '~/env';

export const axiosNocoDB = axios.create({
  baseURL: `${env.NOCODB_API_ENDPOINT}/api/v2/tables`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'xc-token': process.env.NOCODB_API_TOKEN,
  },
});
