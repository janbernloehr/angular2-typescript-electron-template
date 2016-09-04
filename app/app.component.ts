import { Component } from '@angular/core';
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