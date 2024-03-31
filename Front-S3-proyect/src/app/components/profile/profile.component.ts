import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: any;
  userData: any;

  imageUrl: any = "assets/user.png";

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.loadUserImage();
    this.apiService.getUserProfile(this.username).subscribe(data => {
      this.userData = data;
    });
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