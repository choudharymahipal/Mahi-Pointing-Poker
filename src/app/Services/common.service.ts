import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";
import { v4 as uuid } from "uuid";
import { IVisitedUser } from "../Shared/Models/iSession";
import { saveAs } from "file-saver";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  url: string = environment.SITE_ENDPOINT;

  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  httpOptions = {
    headers: this.headers,
  };
  
  constructor(private http: HttpClient) {}

  //Generate unique user id
  generateUniqueUserId(): string {
    const id: string = uuid();
    return id;
  }
  //Generate unique room id (should be small)
  generateUniqueRoomId(): string {
    const time = new Date();
    let hour = time.getHours();
    let minuts = time.getMinutes();
    let seconds = time.getSeconds();
    let ms = time.getMilliseconds();
    let finalId = "" + hour + minuts + seconds + ms;
    return finalId;
  }

  getIpClient(): Observable<any> {
    return this.http.get<any>("https://geolocation-db.com/json/");
  }

  getVisitedUsers(): Observable<IVisitedUser[]> {
    return this.http
      .get<IVisitedUser[]>(this.url + "/assets/visitedUsers.json")
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getVisitedCount(): Observable<number> {
    return this.http.get<any[]>(this.url + "/assets/visitedUsers.json").pipe(
      map((data) => {
        return data.length;
      })
    );
  }

  //Update JSON file
  updateVisitedUser(data: IVisitedUser[]): void {
    this.http.post(
      this.url + "/assets/visitedUsers.json",
      data,
      this.httpOptions
    );
  }

  //Export to JSON
  writeToJsonFile(data: any, filename: string) {
    const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON string
    const blob = new Blob([jsonData], { type: "application/json" }); // Create a blob
    saveAs(blob, filename); // Save the blob as a JSON file
  }

  // public showSuccess(): void {
  //   this.toastrService.success('Message Success!', 'Title Success!');
  // }

  // public showInfo(): void {
  //   this.toastrService.info('Message Info!', 'Title Info!');
  // }

  // public showWarning(): void {
  //   this.toastrService.warning('Message Warning!', 'Title Warning!');
  // }

  // public showError(): void {
  //   this.toastrService.error('Message Error!', 'Title Error!');
  // }
}
