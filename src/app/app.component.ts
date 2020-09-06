import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {

  public userArray: User[] = [];
  public userHeaders: string[];
  editedUser: User;
  isNewRecord: boolean;
  statusMessage: string;
  title = 'modal2';
  editProfileForm: FormGroup;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public dialog: MatDialog) {
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

    ngOnInit() {
      this.editProfileForm = this.fb.group({
        id: [''],
        name: [''],
        surname: [''],
        languages: [[]]
      });
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

    openModal(targetModal, user) {
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static'
      });
      this.editProfileForm.patchValue({
        id: user.id,
        name: user.name,
        surname: user.surname,
        languages: user.languages
      });
    }

    onSubmit() {
      this.modalService.dismissAll();
      console.log("res:", this.editProfileForm.getRawValue());
    }

    openDialog(action,obj) {
      obj.action = action;
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '250px',
        data:obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Add'){
          this.addRowData(result.data);
        }else if(result.event == 'Update'){
          this.updateRowData(result.data);
        }else if(result.event == 'Delete'){
          this.deleteRowData(result.data);
        }
      });
    }

    addRowData(row_obj){
      //var d = new Date();
      this.userArray.push({
        //id:d.getTime(),
        id:row_obj.id,
        name:row_obj.name,
        surname:row_obj.surname,
        languages:row_obj.languages
      });
      this.table.renderRows();
    }

    updateRowData(row_obj){
      this.userArray = this.userArray.filter((value,key)=>{
        if(value.id == row_obj.id){
          value.name = row_obj.name;
          value.surname = row_obj.surname;
          value.languages = row_obj.languages;
        }
        return true;
      });
    }

    deleteRowData(row_obj){
      this.userArray = this.userArray.filter((value,key)=>{
        return value.id != row_obj.id;
      });
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
