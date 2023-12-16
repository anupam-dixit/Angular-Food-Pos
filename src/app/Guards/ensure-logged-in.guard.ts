import {CanActivateFn, Router} from '@angular/router';
import {MyLib} from "../../../Helpers/MyLib";

export const ensureLoggedInGuard: CanActivateFn = (route, state) => {
  let router;
  if (MyLib.User.isLoggedIn()) {
    return true
  } else {
    router = new Router()
    router.navigateByUrl('/login')
    return false
  }
};
