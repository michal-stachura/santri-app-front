import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(({ router }) => {
  router.beforeEach((to) => {
    const loggedIn = LocalStorage.getItem('sapp_userToken');
    if ((!loggedIn || loggedIn === 'null') && to.name !== 'Auth') {
      return { name: 'Auth' };
    }
    return true;
  });
});
