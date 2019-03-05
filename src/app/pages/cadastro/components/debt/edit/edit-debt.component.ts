import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../../cadastro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DebtService } from '../debt.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/models/user-model';
import { UserService } from '../../user/user.service';

@Component({
  templateUrl: './edit-debt.component.html',
  styleUrls: ['./../debt.component.scss'],
  providers: [DebtService, CadastroService, UserService]
})
export class EditDebtComponent implements OnInit, OnDestroy {

  sub: any;
  title: String;
  id: Number;
  debtForm: FormGroup;
  users: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cadastroService: CadastroService,
    private _service: DebtService,  
    private formBuilder: FormBuilder,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.listOfUsers().subscribe((users: any) => this.users = users);

    this.debtForm = this.formBuilder.group({
      id: [undefined],
      reason: ['', Validators.required],
      value: ['', Validators.required],
      startDate: [{value: undefined, disabled: false}, Validators.required],
      userId: [undefined, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.title = "Atualizar dívida";
        this.id = +params['id'];
        this.getById(this.id);
      } else {
        this.title = "Cadastrar dívida"
      }
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  private listOfUsers(): Observable<User> {
    return this._userService.getAll();
  }

  private getById(id: Number){
    this._service.getOne(id)
        .subscribe(
          (debt: any) => {
            this.debtForm.patchValue(debt); 
            this.f.startDate.setValue(new Date(debt.startDate));
          },
          e => console.error(e)
        )
  }

  get f() { return this.debtForm.controls; }

  getErrorMessage(control: any) {
    return control.hasError('required') ? 'O preenchimento do campo é obrigatório!' : '';
  }

  onSubmit() {
      console.log(this.debtForm.value);
      
      this._cadastroService.alertRequest(this._service.save(this.debtForm.value), this.back.bind(this));
  }

  back(){
    this.router.navigate(['pages/cadastro/debt']);
  }

  navigateToRegisterUsers(){
    this.router.navigate(['pages/cadastro/user']);
  }
}
