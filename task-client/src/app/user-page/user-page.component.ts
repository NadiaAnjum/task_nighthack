import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  toDoList    = [];
  comment     = '';
  isShowModal = true;
  task_id     = '';

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.userService.getToDolist().subscribe(success => {
        this.toDoList = success['data'];
    });
  }

  showModal(id, comm)
  {
    this.isShowModal = false;
    this.task_id     = id;
    this.comment     = comm;
  }

  closeModal()
  {
    this.isShowModal = true;
    this.task_id     = '';
  }

  saveComment()
  {
    const in_data = {'comments': this.comment};

    this.userService.updateData(this.task_id, in_data).subscribe(success => {
        this.comment = '';
        this.closeModal();
        this.getData();
    });
  }

}
