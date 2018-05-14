import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
// Add the RxJS Observable operators we need in this app.
import 'rxjs/add/operator/map';
 
@Injectable()
export class SharedService {
    weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    weatherURL2 = "%2C%20";
    weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    findMovieURL1 = "http://www.omdbapi.com/?i=tt3896198&apikey=2762b770&t=";
    findMovieURL2 = "&y=&plot=short&r=json"; 
    currencyURL = "http://data.fixer.io/api/latest?access_key=a1adf9e913d04dadb2dac68f5e4d9fc8&symbols="; 
    totReqsMade: number = 0;
    constructor(private _http: Http) { }
 
    findWeather(city, state) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.weatherURL1 + city + this.weatherURL2+ state + this.weatherURL3)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
 
    findMovie(movie) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.findMovieURL1 + movie + this.findMovieURL2)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json().error));
    }
 
    getCurrencyExchRate(currency) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.currencyURL + currency)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
}