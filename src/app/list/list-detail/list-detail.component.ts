import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailComponent implements OnInit {

  constructor() { }

  @Input() title;
  @Input() contents;
  @Input() imgSrc;
  
  ngOnInit() {
  }

  toggleLike() {
    event.preventDefault();
  }

}
