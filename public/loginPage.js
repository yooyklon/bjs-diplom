'use strict'

let user1 = new UserForm();

user1.loginFormCallback = function(data) {
 let isThis = this;
 ApiConnector.login({...data}, function(response) {
  if (response.success) {
   location.reload();
  } else {
   isThis.setLoginErrorMessage(response.error);
  }
 });
}

user1.registerFormCallback = function(data) {
 let isThis = this;
 ApiConnector.register({...data}, function(response) {
  if (response.success) {
   location.reload();
  } else {
   isThis.setRegisterErrorMessage(response.error);
  }
 });
}