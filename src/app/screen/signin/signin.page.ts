import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  IonCheckbox,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOffOutline, eyeOutline, logoGoogle, logoFacebook } from 'ionicons/icons';
import moment from "moment";
import { NgxMaskDirective } from "ngx-mask";
import { SignupService } from './../../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
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
    HttpClientModule,
    IonCheckbox,
    IonText
  ],
  providers: [
    SignupService
  ]
})
export class SigninPage implements OnInit {

  public ICONE: string = 'eye-off-outline';

  public TYPE_INPUT: string = 'password';

  public formGroup!: FormGroup;

  public dataNascimentoOriginal: any;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) {
    addIcons({logoGoogle,logoFacebook,arrowBackOutline,eyeOffOutline,eyeOutline});
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

  public signin() {
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
          this.redirecionarTelaSigin();
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
      duration: 2000
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

  public async toastAlerta() {
    const toastController = await this.toastController.create({
      message: "Funcionalidade não Implementada!",
      color: "danger",
      position: "top",
      duration: 1000
    });
    return toastController.present();
  }

  public redirecionarTelaSigin() {
    return this.router.navigate(["/signin"]);
  }

  public redirecionarTelaSignup() {
    return this.router.navigate(["/signup"]);
  }

  public realizarSigninGoogle() {
    this.toastAlerta();
  }

  public realizarSigninFacebook() {
    this.toastAlerta();
  }

}
