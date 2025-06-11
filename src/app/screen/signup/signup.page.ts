import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonFooter, IonLabel, IonToolbar, IonHeader, IonIcon, IonButton, IonButtons, IonContent, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor() {
    addIcons({arrowBackOutline,eyeOffOutline});
  }

  ngOnInit() {
  }

}
