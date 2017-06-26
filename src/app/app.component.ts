import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { DataService } from './service/data/data.service';
import { USER_DATA, IMAGE_PATH } from './const'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private authService: AuthService, private dataService: DataService) {
    this.authService;
  }

  ngOnInit() {
    this.dataService.getUserImages(this.authService.getData().uid);
  }
}
