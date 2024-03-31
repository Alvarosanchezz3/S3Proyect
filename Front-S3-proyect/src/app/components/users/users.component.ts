import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ,HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  isCreateUserMenuOpen: boolean = false;
  newUser: any = {
    name: '',
    username: '',
    password: '',
    email: '',
    age: null
  };

  isUpdateUserMenuOpen: boolean = false;
  currentUser: any = {};
  name: any;
  email: any;
  age: any;

  users: any[] = [];
  imageUrl: string = "assets/user.png";

  file:any;
  dragError: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsersByRoleUser().subscribe(
      (data: any) => {
        this.users = data;
        console.log(data);
        this.loadUserImage();
      }
    );

    this.loadUserImage()
  }
  
  // Cargamos las imágenes del bucket de S3
  loadUserImage() {
    this.users.forEach(user => {
      this.apiService.getImageFromS3Bucket(user.username).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'image/jpg' });
          user.imageUrl = URL.createObjectURL(blob);
        }
      )
    });
  }

  // Subimos foto de perfil al bucket cambiandole el nombre por el del nombre de usuario
  uploadFile(username: string) {
    const renamedFile = new File([this.file], username + ".jpg");

    let formData = new FormData();
    formData.set("file", renamedFile);
    // LLamada a la api para subir la imagen con el nombre del usuario al bucket de S3
    this.apiService.uploadImage(formData).subscribe();
    window.location.reload();
    this.file = undefined;
  }

  // Validación para el formulario del update
  isAnyFieldCompleted(): boolean {
    return !!this.name || !!this.email || !!this.age || !!this.file;
}

  // Funciones CRUD de usuarios
  createUser() {
    this.apiService.createUser(this.newUser).subscribe();
    if (this.file != null) {
      this.uploadFile(this.newUser.username)
    }
    console.log(this.newUser)   
    window.location.reload();
    this.newUser = {};
  }
  
  updateUser() {
    let userData = {name: this.name, email: this.email, age: this.age};
    this.apiService.updateUser(this.currentUser.id, userData).subscribe();
    if (this. file != null) {
       this.uploadFile(this.currentUser.username)
    }
    window.location.reload();
    this.name = undefined;
    this.email = undefined;
    this.age = undefined;
  }

  deleteUser(user: any) {
    this.currentUser = { ...user };
    this.apiService.deleteUser(this.currentUser.id).subscribe(
      (response) => {
        console.log(response)
      }
    );

    Swal.fire({
      title: "Estás seguro?",
      text: "No se puede revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Borrar",
      
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Borra el usuario de la BBDD
        this.apiService.deleteUser(this.currentUser.id).subscribe();
 
        // Borra la imagen de ese usuario del bucket de S3
        this.apiService.deleteImageFromS3Bucket(this.currentUser.username).subscribe()

        Swal.fire({
          title: "Cliente borrado!",
          text: "El cliente fue borrado con éxito",
          icon: "success"
        });

        window.location.reload();
        this.currentUser = {};
      }
    });
  }

  // Funciones para abrir y cerras menus
  openCreateMenu() {
    this.isCreateUserMenuOpen = !this.isCreateUserMenuOpen;
    const menu = document.querySelector(".menu") as HTMLElement;
    menu.classList.toggle("active");
  }

  openUpdateMenu(user: any) {
    this.isUpdateUserMenuOpen = !this.isUpdateUserMenuOpen; // Alternar el estado del menú
    const menu = document.querySelector(".menu") as HTMLElement;
    menu.classList.toggle("active"); // Alternar la clase 'active' para mostrar/ocultar el menú
    this.currentUser = { ...user };
  }

  closeMenu() {
    const menu = document.querySelector(".menu") as HTMLElement;
    menu.classList.toggle("active");
    this.isUpdateUserMenuOpen = false; 
    this.isCreateUserMenuOpen = false;
    this.currentUser = {}; // Limpia los datos del usuario
  }

  // Funciones relaccionadas con el drag and drop de archivos 
  getFile(event: any) {
    this.file = event.target.files[0];
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    if (!event.dataTransfer.types.includes('Files') || !event.dataTransfer.items[0].type.includes('image/jpeg')) {
      this.dragError = true;
    } else {
      this.dragError = false;
    }
    event.target.classList.add('dragover');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragError = false;
    event.target.classList.remove('dragover');
  }

  onDropFile(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file.type.includes('image/jpeg')) {
      this.file = file;
      this.dragError = false;
    } else {
      this.dragError = true;
    }
    event.target.classList.remove('dragover');
  }
}