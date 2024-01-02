import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: any;
  password: any;
  showSpinner: any;
 
  login() {
  throw new Error('Method not implemented.');
  }
    constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
      private router: Router, private _dialog: MatDialog,private _coreService: CoreService) {
        sessionStorage.clear();
  
    }
    result: any;
  
    loginform = this.builder.group({
      id: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    });
  
    proceedlogin() {
      if (this.loginform.valid) {
        this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
          this.result = item;
          if (this.result.password === this.loginform.value.password) {
            if (this.result.isactive) {
              sessionStorage.setItem('username',this.result.id);
              sessionStorage.setItem('role',this.result.role);
              this.router.navigate(['']);
            } else {
              this._coreService.openSnackBar('Please contact Admin to Active user','OK');
              //this.toastr.error('Please contact Admin', 'InActive User');
            }
          } else {
            //this.toastr.error('Invalid credentials');
            this._coreService.openSnackBar('Invalid credentials','Dismiss');
          }
        });
      } else {
        //this.toastr.warning('Please enter valid data.')
        this._coreService.openSnackBar('Please enter valid data.','Dismiss');
      }
    }

    
  openRegistrationForm() {
    const dialogRef = this._dialog.open(RegisterComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.router.navigate(['login'])
        }
      },
    });
  }
 
}
