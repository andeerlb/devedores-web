import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';

import { GlobalService } from './services/global.service';

import { MenuComponent } from './layouts/menu/menu.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    providers: [
        GlobalService
    ],
    declarations: [
        MenuComponent,
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ]
})
export class LayoutModule { }
