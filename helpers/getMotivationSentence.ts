export const getMotivationSentence = async () => {
  const BASE_URL = 'https://nodejs-quoteapp.herokuapp.com/quote';
  const CROSS_DOMAIN = 'https://kktrcorsproxy.herokuapp.com';
  const response = await fetch(`${CROSS_DOMAIN}/${BASE_URL}`);
  const data = await response.json();
  return data.quote;
};
