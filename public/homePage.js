let logoutButton = new LogoutButton();

logoutButton.action = function() {
 ApiConnector.logout((response) => {
  if (response.success) {
   location.reload();
  }
 })
};

ApiConnector.current((response) => {
 if (response.success) {
  ProfileWidget.showProfile(response.data);
 }
});

let ratesBoard = new RatesBoard();

function getExchangeRate() {
 ApiConnector.getStocks((response) => {
  if (response.success) {
   ratesBoard.clearTable();
   ratesBoard.fillTable(response.data);
  }
 });
}

function decorator(func, ms) {
 let isBool = false;
 function wrapper() {
  func();
  isBool = true;
  if (isBool) {
   setTimeout(() => isBool = false, ms);
  }
 }
 return wrapper;
}

let exchangeRate = decorator(getExchangeRate, 60000);
exchangeRate();

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
 let isThis = this;
 ApiConnector.addMoney({...data}, (response) => {
  if (response.success) {
   ProfileWidget.showProfile(response.data);
   setMessage(response.success, 'Пополнение прошло успешно');
  } else {
   isThis.setMessage(response.success, response.error);
  }
 });
};

moneyManager.conversionMoneyCallback = function(data) {
 let isThis = this;
 ApiConnector.convertMoney({...data}, (response) => {
  if (response.success) {
   ProfileWidget.showProfile(response.data);
   setMessage(response.success, 'Конвертация прошла успешно');
  } else {
   isThis.setMessage(response.success, response.error);
  }
 });
};

moneyManager.sendMoneyCallback = function(data) {
 let isThis = this;
 ApiConnector.transferMoney({...data}, (response) => {
  if (response.success) {
   ProfileWidget.showProfile(response.data);
   setMessage(response.success, 'Перевод средств прошёл успешно');
  } else {
   isThis.setMessage(response.success, response.error);
  }
 });
};

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
 if (response.success) {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(response.data);
  moneyManager.updateUsersList(response.data);
 }
});

favoritesWidget.addUserCallback = function(data) {
 ApiConnector.addUserToFavorites({...data}, (response) => {
  if (response.success) {
   favoritesWidget.clearTable();
   favoritesWidget.fillTable(response.data);
   moneyManager.updateUsersList(response.data);
  } else {
   moneyManager.setMessage(response.success, response.error);
  }
 })
};

favoritesWidget.removeUserCallback = function(data) {
 ApiConnector.removeUserFromFavorites(data, (response) => {
  if (response.success) {
   favoritesWidget.clearTable();
   favoritesWidget.fillTable(response.data);
   moneyManager.updateUsersList(response.data);
  } else {
   moneyManager.setMessage(response.success, response.error);
  }
 });
};