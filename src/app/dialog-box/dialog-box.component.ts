//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface UsersData {
  id: string;
  name: string;
  surname: string;
  languages: string[];
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html'
})
export class DialogBoxComponent {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
    }

    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
      console.log(this.action);
      console.log(this.local_data);//action и user
    }

    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }

  }
