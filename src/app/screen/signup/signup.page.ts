import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonLabel,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class SignupPage implements OnInit {
  public ICONE: string = 'eye-off-outline';

  public TYPE_INPUT: string = 'password';

  constructor() {
    addIcons({ arrowBackOutline, eyeOffOutline, eyeOutline });
  }

  ngOnInit() { }

  public showPassword() {
    if (this.TYPE_INPUT === 'password') {
      this.TYPE_INPUT = 'text';
      this.ICONE = 'eye-outline';
    } else {
      this.TYPE_INPUT = 'password';
      this.ICONE = 'eye-off-outline';
    }
  }
}
