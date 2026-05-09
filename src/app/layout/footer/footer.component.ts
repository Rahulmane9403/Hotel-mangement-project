import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  currentDate = new Date();

  ngOnInit() {
    // Update time every minute
    setInterval(() => {
      this.currentDate = new Date();
    }, 60000);
  }
}
