import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from '../Services/customer.service';

export class authGurdGuard implements CanActivate {
  
constructor(private customerservice:CustomerService,private router:Router){
  
}


canActivate():boolean{
  if(this.customerservice.isLoggedIn()){
    return true;
  }
  else{
    this.router.navigate(['/login']);
  return false
  }
}

  
}
;




