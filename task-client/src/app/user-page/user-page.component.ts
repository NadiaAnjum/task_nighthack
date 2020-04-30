import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, interval, Subscription } from 'rxjs';
import * as moment from 'moment';

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
  chk_value   = [];
  sel_user    = '';
  userList    = [];
  isTaskModal = true;
  max_date    = '';

  ngOnInit() {

     this.updateSubscription = interval(1000).subscribe(
        (val) => { this.getData()
      });

      //this.getData();
      //this.getMaximumDate();
  }

  getData()
  {
    this.userService.getToDolist().subscribe(success => {

        this.toDoList = success['data'];

        for(var i=0; i<this.toDoList.length; i++)
        {
          this.chk_value[this.toDoList[i]['id']] = false;
        }
    });
  }

  getMaximumDate()
  {
    this.userService.getMaxmDate().subscribe(success => {

        this.max_date = success['data'];

        this.getLatestData();
    });
  }

  getNewMaxDate()
  {
    this.userService.getMaxmDate().subscribe(success => {

        this.max_date = success['data'];
    });
  }

  getLatestData()
  {
    let now = moment();
    //console.log('hello world', now.utc().format('YYYY-MM-DD HH:mm:ss'));

    this.userService.getLatestlist(this.max_date).subscribe(success => {

        const out_data = success['data'];

        if(out_data.length > 0)
        {
          this.toDoList.push(out_data);

          for(var i=0; i<this.toDoList.length; i++)
          {
            this.chk_value[this.toDoList[i]['id']] = false;
          }
        }
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
        //this.getLatestData();
        //this.getNewMaxDate();
    });
  }

  assignTask()
  {
    this.userService.getUsers().subscribe(success => {

        this.userList = success['data'];

        this.isTaskModal = false;
    });
  }

  closeAssignTask()
  {
    this.isTaskModal = true;
  }

  addAssignTask()
  {
    let assign_list = [];

    for(var i=0; i<this.toDoList.length; i++)
    {
      console.log(this.chk_value[this.toDoList[i]['id']]);

      if(this.chk_value[this.toDoList[i]['id']])
      {
        const temp = {
                      'id': this.toDoList[i]['id'],
                       'assigned_to': this.sel_user
                     }
        assign_list.push(temp);

        console.log(JSON.stringify(assign_list));
      }
    }

    if(assign_list.length > 0)
    {
      const in_data = {'to_do_list': assign_list};

      this.userService.postBatchData(in_data).subscribe(success => {
          this.closeAssignTask();
          this.getData();
      });
    }
  }
}
