/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback) {
    createRequest({
      data: data,
      url: `${this.url}/current`,
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        if (response) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, data);
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
      data: data,
      url: `${this.url}/login`,
      method: "POST",
      responseType: 'json',
      callback: (err, response) => {
        if(response) {
          this.setCurrent(response.user);
        }
        callback(err, data);
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
      data: data,
      url: `${this.url}/register`,
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if(response) {
          this.setCurrent(response.user);
        }
        callback(err, data);
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
      url: `${this.url}/logout`,
      method: "POST",
      responseType: 'json',
      callback: callback
    });
  }
}
