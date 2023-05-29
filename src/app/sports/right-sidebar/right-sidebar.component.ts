import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MainService } from 'src/app/services/main.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ActivatedRoute } from '@angular/router';
import { CasinoApiService } from 'src/app/services/casino-api.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']           
})
export class RightSidebarComponent implements OnInit {

  casinodata: any;
  casinoListlist: any;
  SNcasinoList: any = [];
  providerList:any = [];
  providerCode:string="ourcasino"
  searchKey : string = "";

  public searchTerm :string = '';

  @ViewChild('myCarousel')
  myCarousel!: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    // grid: { xs: 4, sm: 4, md: 4, lg: 4, all: 0 },
    grid: {xs: 2, sm: 3, md: 3, lg: 7, xl:7, all: 0},
    load: 3,
    slide: 1,
    interval: { timing: 1500, initialDelay: 1000 },
    
    touch: true,
    loop:true,
    velocity: 0.2,
    vertical: {
      enabled: true,
      height: 1000
    }
    
  }
  carouselItems: any[any] = [
   
    "assets/img/1.png",
    "assets/img/2.png", 
    "assets/img/3.png", 
    "assets/img/4.png",   
    "assets/img/5.png",   
    "assets/img/6.png",   
    "assets/img/7.png",   
    "assets/img/8.png",   

  ];
  mainItems: any[] = [...this.carouselItems]


  constructor(private _cdr: ChangeDetectorRef, private ourcasino: ClientApiService, private mainService: MainService, private apiService: CasinoApiService, route: ActivatedRoute) {
    this.mainService.apis$.subscribe((res) => {
      // console.log(res);
      
      this.listCasinoTables()
    });
   }

   listCasinoTables() {
    this.ourcasino.listCasinoTables().subscribe((resp: any) => {
      // console.log(resp);
      
      this.casinoListlist = resp
      // console.log("listcasino table content", this.casinoListlist)
    })
  }


  ngOnInit(): void {
    this.apiService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  listProviders(){
    this.apiService.listProviders().subscribe((resp: any) => {
      // console.log(resp.result);
      this.providerList = resp.result;
    })
  }


  carouselTileLoad(data: any) {
    let arr = this.carouselItems;
    this.carouselItems = [...this.carouselItems, ...this.mainItems];
  }

  ngAfterViewInit(): void {
    (<any>$('.home-casiono-icons')).flexslider({
      start: function () {
        $(".right-sidebar").addClass("active");
        $(".home-casiono-icons").resize()
      },
      namespace: "promo-",
      animation: "slide",
      direction: "vertical",
      slideshowSpeed: 4000,
      animationSpeed: 500,
      pauseOnHover: false,
      controlNav: true,
      directionNav: true,
      allowOneSlide: false,
      prevText: "",
      nextText: ""
    });
  }




  
}
