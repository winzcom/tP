import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data/data.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageRefs; userData;
  constructor(private fbDataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.userData = this.authService.getData();
  }

  getMyImages() {
    this.imageRefs = this.fbDataService.getUserImages(this.userData.uid);
  }

}
