import history from '../routes/history';
import HomeStore from './HomeStore';
import AuthStore from './AuthStore';
// import WorkBorad, { View as WorkBoradView } from './WorkBorad/workBorad';
const store = {
  // globalStore: new GlobalStore()

};

const authStore = new AuthStore(history);
const homeStore = new HomeStore(history, store);
export { authStore, homeStore };
store.authStore = authStore;

export default store;