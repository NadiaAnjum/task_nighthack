import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  private updateSubscription: Subscription;

  constructor(private userService: UserService) { }

  toDoList    = [];
  comment     = '';
  isShowModal = true;
  isCreateModal = true;
  task_id     = '';
  task_name   = '';
  task_dsp    = '';

  ngOnInit() {
    this.updateSubscription = interval(1000).subscribe(
        (val) => { this.getData()
      });
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

  createTask()
  {
    this.isCreateModal = false;
  }

  closeTask()
  {
    this.isCreateModal = true;
    this.task_name     = '';
    this.task_dsp      = '';
  }

  addTask()
  {
    const in_data = {
                      'task': this.task_name,
                      'description': this.task_dsp,
                      'email_id': this.userService.getUserEmail()
                      };

    this.userService.postNewData(in_data).subscribe(success => {
        this.task_name     = '';
        this.task_dsp      = '';
        this.getData();
    });
  }
}
