import {} from '../env'; // pull in environment variables set via dotenv

export default {
  uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds143678.mlab.com:43678/element-auth-test`,
};
