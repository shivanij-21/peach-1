import { ClientApiService } from './../services/client-api.service';
import { TokenService } from 'src/app/services/token.service';
import { NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { MustMatch } from '../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { UserloginService } from '../services/userlogin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  result: any;
  Loginform!: FormGroup;
  origin = environment.origin;
  submitted: boolean = false;
  login: boolean = false;
  isopen: boolean = false;
  isopen1: boolean = false;
  isnotopen: boolean = false;
  showmore: boolean = false;
  showDropDown: boolean = false;
  ishomebutton: boolean = false;
  sidebar: boolean = false;
  accountInfo: any;
  fundInfo: any;
  gettoken: any;
  isLogin: boolean = false;
  // login1=false

  constructor(
    private userlogin: UserloginService,
    public toastr: ToastrService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService // private UserloginService: UserloginService, // private ClientApiService: ClientApiService
  ) {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      // console.log(this.isLogin)
    }
    if (this.router.url.indexOf('/sports') > -1) {
      this.isopen = true;
      this.isnotopen = false;
      this.ishomebutton = true;
      this.sidebar = true;
    } else if (this.router.url.indexOf('/cardmeter') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/casino') > -1) {
      this.isopen = true;
    } else if (this.router.url.indexOf('/fullmarkets') > -1) {
      this.isopen = true;
    } else if (this.router.url.indexOf('/slot') > -1) {
      this.isopen = true;
    }
    else if (this.router.url.indexOf('/Fantasy') > -1) {
      this.isopen = true;
    }
    else if (this.router.url.indexOf('/faq') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/account-statement') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/currentt-bets') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/activity') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/casinoresult') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/bet-history') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/profit-loss') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/securityauth') > -1) {
      this.isopen1 = true;
    } else if (this.router.url.indexOf('/') > -1) {
      this.isnotopen = true;
    } else {
      this.ishomebutton = false;
      this.sidebar = false;
    }
  }

  ngOnInit(): void {
    this.UserDescription();
    this.initform();
    // $(document).on('show.bs.modal', '.modal', function () {
    //   $(this).appendTo('body');
    // });

  }

  initform() {
    this.Loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['0000', Validators.required],
      log: ['0000', Validators.required],
      origin: [this.origin, Validators.required],
    });
  }

  get username() {
    return this.Loginform.get('username');
  }
  get password() {
    return this.Loginform.get('password');
  }

  // login(){
  //   this.login1=!this.login1
  // }

  get f() {
    return this.Loginform.controls;
  }

  openBetsBtn() {
    var V = $('#opensidebarSlide');
    var W = V.find('#sidebarSlide');
    // console.log(V);

    $('#openSidebar')
      .unbind('click')
      .click(function () {
        V.show();
        W.css('display', 'flex');
        W.addClass('left-in');

        window.setTimeout(function () {
          W.removeClass('left-in');
        }, 1000);
      });

    $('#close').bind('click', function () {
      V.fadeOut();
    });
  }

  ngAfterViewInit() {
    this.openBetsBtn();
  }

  Login() {
    this.login = true;
    this.result = '';
    // stop here if form is invalid
    if (this.Loginform.invalid) {
      return;
    }
    // console.log(this.loginForm.value);
    this.userlogin.login(this.Loginform.value).subscribe((data: any) => {
      this.result = data.result;

      // data = {
      //   errorCode: 0,
      //   errorDescription: null,
      //   result: [
      //     {
      //       userId: 368943,
      //       userStatus: 0,
      //       parentId: 367295,
      //       userName: 'Super01',
      //       name: '',
      //       balance: 94790.7,
      //       token: '4CA9E257EC22667B554856D5D466B1E4',
      //       loginTime: '1/5/2023 1:24:45 PM',
      //       conversion: 1.0,
      //       creditRef: 100000.0,
      //       userType: 8,
      //       rules: 'PHA+c3M8L3A+',
      //       currencyCode: 'INR',
      //       stakeSetting:
      //         '100,500,1000,5000,10000,25000,50000,100000,200000,500000',
      //       newUser: 0,
      //     },
      //   ],
      // };

      // console.log(data, 'response');
      if (data.errorCode === 0) {
        this.toastr.success('Login Successfully');
        $('#exampleModal [data-bs-dismiss=modal]').trigger('click');
        // console.log(data.result[0].token)
        this.router.navigate(['/sports']);
        this.token.setToken(data.result[0].token);
        this.gettoken = this.token.getToken();
        // console.log(this.gettoken, 'gettoken');
        this.token.setUserInfo(data.result[0]);
        // localStorage.setItem("mydata", JSON.stringify(this.result));
        // this.loginForm.reset();
        this.login = false;
      } else {
        this.toastr.error(data.errorDescription);
        $('#exampleModal [data-bs-dismiss=modal]').trigger('click');
      }
    }
    );
  }

  onclick1() {
    this.showmore = !this.showmore;
  }

  showDrop() {
    this.showDropDown = !this.showDropDown;
  }

  logout() {
    this.userlogin.logout().subscribe((resp: any) => {
      if (resp.errorCode == 0) {
        this.token.removeToken();
      }
    });
    this.token.removeToken();
  }

  UserDescription() {
    this.accountInfo = this.token.getUserInfo();

    // console.log(this.accountInfo)
  }


  openLoginForm() {
    $('#log').fadeIn();
  }

  closeLoginForm() {
    $('#log').fadeOut();
  }
}
