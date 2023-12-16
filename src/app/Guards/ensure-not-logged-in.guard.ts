import {CanActivateFn, Router} from '@angular/router';
import {MyLib} from "../../../Helpers/MyLib";

export const ensureNotLoggedInGuard: CanActivateFn = (route, state) => {
  let router;
  if (MyLib.User.isLoggedIn()) {
    router = new Router()
    router.navigateByUrl('/panel/dashboard')
    return false
  }
  return true
};
