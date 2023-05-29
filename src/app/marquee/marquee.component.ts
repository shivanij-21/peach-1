import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { UserloginService } from '../services/userlogin.service';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent implements OnInit {
  result: any;
  marqueeResult: any;

  constructor(private news: UserloginService) { }

  ngOnInit(): void {
    this.marquee()
  }

  marquee() {
    this.news.news().subscribe((data:any) => {
      this.result = data
      // console.log(data,"marquee response")
    })
  }

}
