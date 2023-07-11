import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(({ router }) => {
  router.beforeEach((to) => {
    const loggedUser = LocalStorage.getItem('sapp_user');

    if (to.matched.some(record => record.meta.loginRequired)) {
      if (!loggedUser || loggedUser === 'null') {
        return { name: 'Auth' };
      }
    }
    return true;
  });
});
