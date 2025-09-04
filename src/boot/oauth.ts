import { defineBoot } from '@quasar/app-vite/wrappers';
import type { User } from 'oidc-client-ts';
import { Log, UserManager } from 'oidc-client-ts';
import { ref } from 'vue';

export const signingIn = ref(false);
export const signedIn = ref(false);
export const signedInUser = ref<User | null>(null);
export const userManager = new UserManager({
  authority: 'https://idms.stsa.tw/application/o/membership/',
  client_id: 'ZTK0PFLpwU2saDe4UMz2zYAF1TxNsE9ERyJt2S73',
  redirect_uri: window.location.href,
  scope: 'openid profile email offline_access',
  loadUserInfo: true,
});
userManager.events.addUserSessionChanged(() => {
  void userManager.getUser().then((user) => {
    signedInUser.value = user;
    signedIn.value = !!user;
  });
});

export function signIn() {
  void userManager.signinRedirect();
}

export function signOut() {
  void userManager.signoutRedirect();
}

export default defineBoot(() => {
  Log.setLogger(console);
  if (window.location.pathname.endsWith('/membership')) {
    window.location.pathname = '/membership/';
  }
  if (window.location.search) {
    signingIn.value = true;
    void userManager
      .signinCallback()
      .then(async () => {
        signedInUser.value = await userManager.getUser();
        signedIn.value = true;
      })
      .finally(() => {
        window.location.search = '';
        signingIn.value = false;
      });
  }
  void userManager.getUser().then((user) => {
    if (user) {
      signedInUser.value = user;
      signedIn.value = true;
      void userManager.querySessionStatus().then((proof) => {
        console.log(proof);
      });
    }
  });
});
