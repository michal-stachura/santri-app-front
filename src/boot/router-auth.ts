import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(({ router }) => {
  router.beforeEach((to) => {
    const loggedUser = LocalStorage.getItem('sapp_user');
    if ((!loggedUser || loggedUser === 'null') && to.name !== 'Auth') {
      return { name: 'Auth' };
    }
    return true;
  });
});
