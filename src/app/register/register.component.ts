import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService,private _dialog: MatDialog, private _coreService: CoreService) {

  }

    registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        //this.toastr.success('Please contact admin for enable access.','Registered successfully');
        this._coreService.openSnackBar('lease contact admin for enable access. Registered successfully !!', 'Done');
        // this.toastr.success('Success messagePlease contact admin for enable access.Registered successfully', 'Success', {
        //   positionClass: 'toast-center',
        // });
        
        this._dialog.closeAll();
        this.router.navigate(['login']);
      });
    } else {
      //this.toastr.warning('Hi Vikas Please enter valid data.');
      this._coreService.openSnackBar('Please enter valid data.')
    }
  }

}
