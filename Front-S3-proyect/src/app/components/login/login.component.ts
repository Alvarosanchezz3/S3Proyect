import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent{

  username: any;
  password: any;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Funciones para los inputs
  inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".input");

  addcl(event: FocusEvent) {
    const target = event.target as HTMLElement;
    const parent = target.parentElement?.parentElement;
    if (parent) {
      parent.classList.add("focus");
    }
  }

  remcl(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    const parent = target.parentElement?.parentElement;
    if (parent && target.value === "") {
      parent.classList.remove("focus");
    }
  }

  // Funciones para el inicio de sesión
  login() {
    let credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        // Verificar si el usuario es administrador
        if (response.role === 'ROLE_ADMIN') {
          // Establecer sesión y redirigir a la página de inicio
          this.authService.setUser(this.username);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/home', this.username]);
        } else {
          // Si el usuario no es administrador, mostrar mensaje de error
          this.errorMessage = 'Only administrators are allowed to login.';
        }
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Only administrators are allowed to login.';
        } else {
          this.errorMessage = 'Incorrect username or password.';
        }
      }
    );
  }
}