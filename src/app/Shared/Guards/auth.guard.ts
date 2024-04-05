import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Injectable()
class CheckLogin {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(["/"]);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(CheckLogin).canActivate();
};
