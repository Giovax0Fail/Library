import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(public router: Router) {}
  selectedIndex!: number;

  tabChange(event: any): void {
    this.selectedIndex = event.index;
    if (this.selectedIndex === 0) {
      this.router.navigate(['/dashboard']);
      console.log("questo è l'evento home", event);
    } else if (this.selectedIndex === 1) {
      this.router.navigate(['/insert']);
      console.log("questo è l'evento form", event);
    }
    // } else if (this.selectedIndex === 2) {
    //   console.log("questo è l'evento modifica", event);
    //   this.router.navigate(['/edit']);
    // }
  }
}
