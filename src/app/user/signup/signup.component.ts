import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '@services';
import { checkPassword } from '../../validators/custom.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Output() loginAction = new EventEmitter();
  registrationForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  isEmailRegister = 0;
  errEmaliregister = "";
  constructor(
    public route: Router,
    private fb: FormBuilder,
    private mainService:MainService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registrationForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, { validator: checkPassword })
  }

  onSubmit(): void {

    this.mainService.signup(this.registrationForm.value).subscribe(
      (res) => {
        this.loginAction.emit(0)
        let message = "REGISTERED SUCCESSFULLY"
        let action = "DISMISS"
        this._snackBar.open(message, action, {
          verticalPosition: 'bottom',
          horizontalPosition: 'end', 
          panelClass: ['red-snackbar'],
          duration: 3000
        })
      },
      (error) => {
        
        if(error.error.message.includes('E11000 duplicate key error collection')){
        
          this.isEmailRegister = 1;
          this.errEmaliregister = "This email address is exist .please use another email address";
        }else{
          this.isEmailRegister = error.error.isUerExist;
          this.errEmaliregister = error.error.message;
        }
      }
    )


  }

  login(): void {
    this.loginAction.emit(0)
  }

  onKeyUp(){
    this.isEmailRegister = 0;
  }
}
