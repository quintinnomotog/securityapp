import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { SignupService } from './../../service/signup.service';
import { LoadingController, ToastController } from '@ionic/angular';

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
    HttpClientModule
  ],
  providers: [
    SignupService
  ]
})
export class SignupPage implements OnInit {

  public ICONE: string = 'eye-off-outline';

  public TYPE_INPUT: string = 'password';

  public formGroup!: FormGroup;

  public dataNascimentoOriginal: any;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private loadingController: LoadingController,
    private toastController: ToastController,
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
    this.dataNascimentoOriginal = data;
    this.formGroup.patchValue({
      dataNascimento: moment(data).format("DD/MM/YYYY")
    });
  }

  private configurarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: ["", [Validators.required]],
      identificador: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      senha: ["", [Validators.required]],
    });
  }

  public signup() {
    console.log('Dados do formulário: ', this.formGroup.value);
    this.signupService.signup(
      this.formGroup.value.nome,
      this.formGroup.value.identificador,
      this.dataNascimentoOriginal,
      this.formGroup.value.telefone,
      this.formGroup.value.senha).subscribe({
        next: () => {
          console.log("Sucesso!");
          this.loading();
          this.resetFormulario();
      },
        error: () => {
          console.log("Erro!");
          this.toastError();
        }
      });
  }

  public resetFormulario() {
    this.formGroup.reset();
  }

  public async loading() {
    const loadingController = await this.loadingController.create({
      message: "Salvando dados...",
      spinner: "crescent",
      duration: 3000
    });
    return loadingController.present();
  }

  public async toastError() {
    const toastController = await this.toastController.create({
      message: "Erro ao tentar cadastrar os dados!",
      color: "danger",
      position: "top",
      duration: 3000
    });
    return toastController.present();
  }

}
