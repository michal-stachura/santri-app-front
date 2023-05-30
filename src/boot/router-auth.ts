import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(({ router }) => {
  router.beforeEach((to) => {
    const loggedIn = LocalStorage.getItem('sapp_loggedIn');

    if (!loggedIn && to.name !== 'Auth') {
      return { name: 'Auth' };
    }
    return true;
  });
});
