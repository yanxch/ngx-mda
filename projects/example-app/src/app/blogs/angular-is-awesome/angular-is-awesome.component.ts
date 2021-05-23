import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './angular-is-awesome.component.md',
    styleUrls: ['./angular-is-awesome.component.scss'],
})
export class AngularIsAwesomeComponent implements OnInit {
    items = ['one', 'two', 'three'];

    show = true;

    constructor() { }

    ngOnInit(): void { }
}
