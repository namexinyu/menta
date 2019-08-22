import { observable, action, computed, autorun, toJS } from "mobx";
import { BaseView, BaseViewStore } from "./BaseViewStore";
import { message } from 'antd';
import basename from '../config/basename';
import { login } from '../service/login'
import AES from 'crypto-js/aes';
import crypto_enc_u8 from 'crypto-js/enc-utf8';
import MD5 from 'crypto-js/md5';
import { sessionStorage } from '../utils/Storage';


const sessionStorageKey = localStorage;

export default class {
  @observable authInfo = {};
  @observable loginFormInfo = { username: 'admin', password: 123456 };
  @observable loginLoading = false;
  @observable getVCodeLoading = false;
  constructor() {
    console.log('ssss');
    try {
      console.log(localStorage.getItem('renzhichu'));

      if (!localStorage.getItem('renzhichu')) throw new Error();
      let renzhichu = JSON.parse(localStorage.getItem('renzhichu'));
      if (renzhichu.id) {
        this.authInfo = renzhichu;
      } else {
        throw new Error();
      }
    } catch (ignore) {
      this.authInfo = {};
    }
  }
  @action
  handleFormFieldsChange = (changedFields) => {
  };

  @action
  handleLogin = async (fieldsValue) => {
    try {
      let data = await login(fieldsValue);
      let Data = data.data;
      if (!Data.id) return;
      localStorage.setItem('renzhichu', JSON.stringify(Data));
      this.authInfo = Data;

    } catch (error) {
      message.error(error.message);
    }
    this.loginLoading = false;
  };

  @action
  refreshAuthInfo = (param) => {
    try {

    } catch (e) {

    }
  };

  @action
  getVCode = async () => {

    try {

    } catch (e) {

    }
  };
  @action
  handleFormFieldsChange = (changedFields) => {
    this.loginFormInfo = { ...this.loginFormInfo, ...changedFields };
  };
  @action
  handleLogout = () => {
    this.authInfo = {};
    localStorage.setItem('renzhichu', JSON.stringify({}));
    window.location.href = basename + '/';
  };

  @computed
  get isLogin() {
    return !!(this.authInfo && this.authInfo.username && this.authInfo.id);
  }

  @computed
  get loginEnable() {
    let { username = {}, password = {} } = this.loginFormInfo;
    return username.value && !username.errors && password.value && !password.errors;
  }
  @computed
  get sendCodeEnable() {
    let { username = {} } = this.loginFormInfo;
    return username.value && !username.errors;
  }

  setStorage = autorun(() => {

  });
}