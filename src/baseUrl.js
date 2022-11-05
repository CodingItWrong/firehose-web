function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000/api';
  } else {
    // TODO: add custom domain before sending to App Store in case I switch off Heroku
    return 'https://firehose-api.herokuapp.com/api';
  }
}

const baseUrl = getBaseUrl();

export default baseUrl;
