import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

/* children components */
import { EditUserComponent } from './components/user/edit/edit-user.component';
import { ViewUserComponent } from './components/user/view/view-user.component';
import { ViewDebtComponent } from './components/debt/view/view-debt.component';
import { EditDebtComponent } from './components/debt/edit/edit-debt.component';
import { RouterUtils } from '../../shared/utils/router.utils';

const childRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            RouterUtils.createRegister('user', ViewUserComponent, EditUserComponent),
            RouterUtils.createRegister('debt', ViewDebtComponent, EditDebtComponent)
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
