import configurations from './config.yml';

const config = configurations[process.env.ENVIRONMENT];

export default config;
