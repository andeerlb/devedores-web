import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './cadastro.routing';
import { SharedModule } from '../../shared/shared.module';

/* components */
import { CadastroComponent } from './cadastro.component';
import { EditUserComponent } from './components/user/edit/edit-user.component';
import { ViewUserComponent } from './components/user/view/view-user.component';
import { ViewDebtComponent } from './components/debt/view/view-debt.component';
import { EditDebtComponent } from './components/debt/edit/edit-debt.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    declarations: [
        CadastroComponent,
        EditUserComponent,
        ViewUserComponent,
        ViewDebtComponent,
        EditDebtComponent
    ]
})
export class CadastroModule { }
