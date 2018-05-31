import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log("Async Task Calling Callback");
      jQuery("#main").removeClass("is-loading");
    }, 100);
  }

}
