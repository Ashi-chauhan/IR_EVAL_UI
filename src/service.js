const default_options = {
  'cache-control': 'no-cache'
};

const getOptions = (type, payload = null) => {
  let options = Object.assign({}, default_options, {
    'headers': { 'Content-Type': 'application/json' },
    method: type
  });

  if (type === 'PUT' || type === 'POST') {
    options.body = JSON.stringify(payload);
  }
  return options;
};

const genericRequest = (url, options) => {
  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return Promise.reject(`${error} .Please try agin Later`);
    });
};

const AppService = () => {
	let baseURL = `${process.env.REACT_APP_API_URL}`;

	return {
		getResult: (payload, type) => {
			let url = type === "summary" ? `${baseURL}/summaryresult` : `${baseURL}/detailedresult`;
			let options = getOptions('POST', payload);
			return genericRequest(url, options);
		}
	};
};
  
  export default AppService();