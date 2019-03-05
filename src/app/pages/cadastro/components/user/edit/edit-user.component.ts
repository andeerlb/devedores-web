import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../../cadastro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../../../../shared/models/user-model';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./../user.component.scss'],
  providers: [UserService, CadastroService]
})
export class EditUserComponent implements OnInit, OnDestroy {

  sub: any;
  title: String;
  id: Number;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cadastroService: CadastroService,
    private _service: UserService,  
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [undefined],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: [''],
      phone: [''],
      website: [''],
      lat: [undefined],
      lng: [undefined],
      city: [''],
      street: [''],
      suite: [''],
      zipcode: [undefined]
    });

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.title = "Atualizar usuário";
        this.id = +params['id'];
        this.getById(this.id);
      } else {
        this.title = "Cadastrar usuário"
      }
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  private getById(id: Number){
    this._service.getOne(id)
        .subscribe(
          (user: any) => {
            this.userForm.patchValue(user);            
          },
          e => console.error(e)
        )
  }

  get f() { return this.userForm.controls; }

  getErrorMessage(control) {
    return control.hasError('required') ? 'O preenchimento do campo é obrigatório!' : '';
  }

  onSubmit() {
      this._cadastroService.alertRequest(this._service.save(this.userForm.value), this.back.bind(this));
  }

  back(){
    this.router.navigate(['pages/cadastro/user']);
  }
}
