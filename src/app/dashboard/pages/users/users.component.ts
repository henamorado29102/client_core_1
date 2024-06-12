import { Component, Injectable, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {take} from 'rxjs';
import { UsersService } from '../../../services/users.service';

import { User, UserResponsePaginate, UsersResponse } from '../../../interfaces/req-response';
//import { TitleComponent } from '../../../shared/title/title.component';





@Component({
  standalone: true,
  imports: [CommonModule,  RouterModule, MatTableModule, MatPaginatorModule, MatCardModule],
  templateUrl: "./users.component.html",
  styles: ``
})
export default class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'actions'];
  dataSource: User[] = [];
  public userService = inject(UsersService)

  length = 50
  pageSize = 5
  pageSizeOptions= [5, 10, 15]
  
  constructor(){   
  }

  ngOnInit(): void {    
    this.LoadUser(0, 5)
    
  }

  LoadUser(pageIndex: number, pageSize: number){
    this.userService.getAllPaginate(pageIndex, pageSize).pipe(take(1)).subscribe(response => {
      this.dataSource = response.data  
      this.length = response.total    
    })      
  }

  pageChanged(e: PageEvent){
   this.LoadUser(e.pageIndex, e.pageSize)
  }

  
}
