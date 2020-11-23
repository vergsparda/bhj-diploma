/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
 const xhr = new XMLHttpRequest();
 const formData = new FormData();
 let urlGET = options.url + "?";

 for (let form in options.data) {
   formData.append(form, options.data[form]);
   // url для запросов типа GET
   urlGET += `${form}=${options.data[form]}&`;
 }

 xhr.open(options.method, options.method == 'GET' ? urlGET.slice(0, -1) : options.url);

 //  в запросе имеются заголовки

 if(options.headers) {
   for (let  header in options.headers) {
     xhr.setRequestHeader(header, options.headers[header]);
   }
 };

 xhr.responseType = options.responseType;
 xhr.withCredentials = true;

 xhr.addEventListener('readystatechange', () => {
   if (xhr.readyState === 4 && xhr.status === 200){
     options.callback(null, xhr.response);
   } else {
     options.callback(xhr.status, null)
   }
 });

 options.method == 'GET' ? xhr.send() : xhr.send(formData);

 return xhr;
};
