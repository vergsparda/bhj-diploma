/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accList = document.querySelectorAll('.accounts-select');

    Account.list(User.current(), (err, response) => {
      for (let el of accList){
        el.innerHTML = '';
      }

      if(response) {
        response.data.forEach(el => {
          let account = `<option value="${el.id}">${el.name}</options>`;
          for (let item of accList) {
            item.insertAdjacentHTML('beforeEnd', account);
          }
        });
      }
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        let name = `new${options.type[0].toUpperCase()}${options.type.slice(1)}`;
        App.getModal(name).close();
        App.update()
      }
    })
  }
}
