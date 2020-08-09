import { Component } from '@angular/core';

export const baseUrl: string = 'http://localhost:3000/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Master-Detail';
}
