import { Component, Pipe, PipeTransform } from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/main.html'
})
export class AppComponent {

    constructor() {

    }

    public working : boolean;

    public  StartWorking() : void {
        this.working = true;

        Observable.interval(2000).subscribe(() => {this.working = false;});
    }

}