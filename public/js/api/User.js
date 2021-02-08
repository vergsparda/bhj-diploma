/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = './user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    window.localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    window.localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      data: data,
      responseType: 'JSON',
      callback: (err, response) => {
        if(response.user && data.success) {
          this.setCurrent(response.user);
        } 
        else {
          this.unsetCurrent();
        }
      callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/login',
      data: data,
      responseType: 'JSON',
      callback: (err, response) => {
        if(response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/register',
      data: data,
      responseType: 'JSON',
      callback: (err, response) => {
       if(response.success) {
         this.setCurrent(response.user);
       }
       callback(err, response);  
     }
     });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    createRequest({
      data: data,
      url: this.URL + '/logout',
      method: "POST",
      responseType: 'JSON',
      callback: (err, response) => {
        if( response && response.user) {
          this.unsetCurrent();
        };
        callback(err, response);
      }
    });
  }
}
