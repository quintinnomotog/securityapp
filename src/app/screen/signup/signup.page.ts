import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import moment from "moment";
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    NgxMaskDirective,
    IonDatetime,
    IonModal,
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
    ReactiveFormsModule,
  ],
})
export class SignupPage implements OnInit {

  public ICONE: string = 'eye-off-outline';

  public TYPE_INPUT: string = 'password';

  public formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    addIcons({ arrowBackOutline, eyeOffOutline, eyeOutline });
  }

  ngOnInit() {
    this.configurarFormulario();
  }

  public showPassword() {
    if (this.TYPE_INPUT === 'password') {
      this.TYPE_INPUT = 'text';
      this.ICONE = 'eye-outline';
    } else {
      this.TYPE_INPUT = 'password';
      this.ICONE = 'eye-off-outline';
    }
  }

  public getData(data: any) {
    this.formGroup.patchValue({
      data: moment(data).format("DD/MM/YYYY")
    });
  }

  private configurarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: ["", [Validators.required]],
      sobrenome: ["", [Validators.required]],
      email: ["", [Validators.required]],
      data: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      senha: ["", [Validators.required]],
    });
  }

  public create() {
    console.log('Dados do formulário: ', this.formGroup.value);
    this.resetFormulario();
  }

  public resetFormulario() {
    this.formGroup.reset();
  }

}
