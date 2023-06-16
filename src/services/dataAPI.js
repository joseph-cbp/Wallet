const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchData = async () => {
  const response = await fetch(URL);
  const currencyResponse = await response.json();

  return currencyResponse;
};

export default fetchData;
