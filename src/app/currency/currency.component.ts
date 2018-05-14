import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styles: []
})
export class CurrencyComponent implements OnInit {

  id_currency: string = "";
  my_result: any;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
  }

  callCurrencyService() {
    this._sharedService.getCurrencyExchRate(this.id_currency.toUpperCase())
      .subscribe(
        lstresult => {
          this.my_result = [];
          for (var key in lstresult.rates) {
            if (lstresult.rates.hasOwnProperty(key)) {
              this.my_result.push({ currency: key, value: lstresult.rates[key] });
            }
          }
        },
        error => {
          console.log("Error. The callCurrencyService result JSON value is as follows:");
          console.log(error);
        }
      );
  }
}