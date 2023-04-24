import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() registerAction = new EventEmitter();
  loginForm: FormGroup = new FormGroup({});
  hide = true;
  isLoginError = 0;
  
    constructor(  public route: Router,private fb: FormBuilder, private mainService:MainService,private _snackBar: MatSnackBar){
    }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    this.mainService.login(this.loginForm.value).subscribe(
      (res) => {
        let userData = this.mainService.getDataFromStorage("userData");
      
        if (!userData && res.status == 200) {
          this.mainService.addDataToStorage(res.data);
        }
        this.mainService.isLogin(true);
        this.route.navigate(['news']);
        const message = "LOGIN SUCCESSFULLY";
        const action = "DISMISS";
        this._snackBar.open(message, action, {
          verticalPosition: 'bottom',
          duration: 3000,
          horizontalPosition: 'end', 
          panelClass: ['red-snackbar'],
        });
      },

      (error) => {
       console.log("ERROR", error)
        const message = "Something wrong with Email or Password plz check and try again!";
        const action = "DISMISS";
        this._snackBar.open(message, action, {
          verticalPosition: 'bottom',
          duration: 3000,
          horizontalPosition: 'end', 
          panelClass: ['red-snackbar'],
        });
        this.isLoginError = error.error.isError;
      }

    );
  }

  register(): void {
    this.registerAction.emit(1);
  }
  onKeyUp() {
    this.isLoginError = 0;
  }
}
