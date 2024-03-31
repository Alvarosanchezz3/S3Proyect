import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  username: any;
  imageUrl: any = "assets/user.png";

  constructor(public authService: AuthService, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadUserImage();
  }

  toggleMenu() {
    const menuIcon = document.getElementById('menu-icon') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;

    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');  
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  loadUserImage() {
    this.apiService.getImageFromS3Bucket(this.username).subscribe(
      (response: any) => {
        // Crear una URL del blob recibido
        const blob = new Blob([response], { type: 'image/jpg' });
        this.imageUrl = URL.createObjectURL(blob);
      }
    );
  }
}