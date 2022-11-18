import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PublicLayoutComponent } from '../shared/layout/public-layout/public-layout.component';
import { CardModule } from '../shared/components/card/card.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomepageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [HomepageComponent, AddBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    MatInputModule,

    CardModule,
    MatIconModule,

    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,

    MatFormFieldModule,
  ],
})
export class HomepageModule {}
