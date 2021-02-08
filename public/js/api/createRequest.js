/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  try {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    const formData = new FormData(); 

    if (options.method === 'GET') {
        for (let el in options.data) {
            url += `&${el}=${options.data[el]}`
        }
        url = url.replace('&', '?');
    } else {
        for (let el in options.data) {
            formData.append(el, options.data[el])
        }
    }

    if (options.headers) {
        for (header in options.headers) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
    }
  
    xhr.open(options.method, url);
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            options.callback(null, JSON.parse(xhr.response));
        }
    });

    xhr.send(formData);

  } catch (e) {
      options.callback(e, null);
  }
};
