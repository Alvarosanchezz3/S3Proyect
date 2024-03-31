import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AuthService],
})
export class HomeComponent  implements OnInit{

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn)
  }
  
}