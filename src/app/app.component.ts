import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent {

  public userArray: User[] = [];
  public userHeaders: string[];
  editedUser: User;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private http: HttpClient){
    this.http.get('assets/semicolon.csv', {responseType: 'text'})
    .subscribe(
      data => {
        console.log(data);
        let csvToRowArray = data.split("\n");
        this.userHeaders = csvToRowArray[0].slice(1,csvToRowArray[0].length - 2).split(";");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].slice(1,csvToRowArray[index].length - 2).split(";");
          this.userArray.push(new User( row[0], row[1], row[2], row[3].split(', ')));
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addUser() {
    this.editedUser = new User('', '', '', []);
    this.userArray.push(this.editedUser);
    this.isNewRecord = true;
  }

  editUser(user: User) {
    this.editedUser = new User(user.id, user.name, user.surname, user.languages);
  }

  save() {
    let stringToCsv = '"' + this.userHeaders.join(";") + '"\n';
    for (let index = 0; index < this.userArray.length; index++) {
      stringToCsv += (`"${this.userArray[index].id};${this.userArray[index].name};${this.userArray[index].surname};${this.userArray[index].languages.join(', ')}"\n`);
    }
    console.log(stringToCsv);
  }

}

export class User{
  id: String;
  name: String;
  surname: String;
  languages: string[];

  constructor(id: String, name: String, surname: String, languages: string[]){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.languages = languages;
  }
}
