const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-app',
  port: process.env.PORT || 8000,
  secret: "iloveu"
};

export default config;
