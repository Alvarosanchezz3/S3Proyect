import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  urlBase: string = 'http://localhost:9090/api/v1/';

  constructor(private http: HttpClient) {}

  getUsersByRoleUser() {
    return this.http.get(this.urlBase + "users")
  }

  getUserProfile(username: string) {
    let urlwithUsername = this.urlBase + "users/profile/" + username;
    return this.http.get(urlwithUsername)
  }

  createUser(userData: any) {
    return this.http.post(this.urlBase + "users/register", userData)
  }

  updateUser(id: number, userData: any) {
    let urlwithId = this.urlBase + "users/" +id;
    return this.http.put(urlwithId, userData)
  }

  deleteUser(id: number) {
    let urlwithId = this.urlBase + "users/" +id;
    return this.http.delete(urlwithId)
  }

  getImageFromS3Bucket(username: string): Observable<Blob> {
    return this.http.get(this.urlBase + "s3/downloadAsBytes/" + username + ".jpg", { responseType: 'blob' });
  }

  uploadImage(file: any) {
    return this.http.post(this.urlBase + "s3/upload", file)
  }

  deleteImageFromS3Bucket(username: string) {
    return this.http.delete(this.urlBase + "s3/delete/" + username + ".jpg")
  }
}