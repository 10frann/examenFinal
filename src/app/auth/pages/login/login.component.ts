import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('email') email!:ElementRef<HTMLInputElement>
  @ViewChild('password') password!:ElementRef<HTMLInputElement>

  form:FormGroup = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(3)]]
  })

  constructor(private service:AuthService, private router:Router, private formBuilder:FormBuilder) {}

  login(){
    if(this.form.invalid){
      return;
    }
    this.service.login(this.email.nativeElement.value, this.password.nativeElement.value).subscribe((data) => {
      this.router.navigateByUrl('auth/home')
    })
  }
  isValidField(field: string):boolean | null{
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  getFieldError( field: string ): string | null {

    if ( !this.form.controls[field] ) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'email':
          return 'Este campo es de tipo Email'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }
}
