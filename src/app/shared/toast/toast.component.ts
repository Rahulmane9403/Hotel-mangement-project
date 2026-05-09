import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  show = false;
  message = '';
  type: 'success' | 'error' = 'success';

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.message = msg;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
