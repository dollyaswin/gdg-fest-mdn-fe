import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <mat-card style="box-shadow: none;" class="border" appearance="outlined">
      <div class="leading-4 w-full cursor-pointer flex flex-col">
        <div class="flex justify-between items-center">
          <a class="text-slate-700 text-sm tracking-normal font-medium">{{
            title
          }}</a>
          <mat-icon
            mat-button
            [matMenuTriggerFor]="menu"
            class="text-slate-600 text-lg font-medium"
            >more_vert</mat-icon
          >
          <mat-menu #menu="matMenu" class="mx-auto">
            <button mat-menu-item (click)="showModal(true)">Edit</button>
            <button mat-menu-item class="red-font" (click)="onDelete(true)">
              Delete
            </button>
          </mat-menu>
        </div>
        <span class="text-slate-700 text-xs font-normal blue-font">
          by {{ author }}</span
        >
        <span class="text-slate-700 text-sm font-normal mt-6"
          >Publisher: {{ publisher }}</span
        >
        <span class="green-font text-xs font-light">ISBN: {{ isbn }}</span>
        <div class="flex items-center justify-between">
          <span class="text-slate-700 text-xs font-light"
            >Created at: {{ createdAt | date }}</span
          >
          <span class="text-slate-700 text-xs font-light"
            >Last updated:
            {{ updatedAt !== null ? (updatedAt | date) : '-' }}</span
          >
        </div>
      </div>
    </mat-card>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() content!: string;
  @Input() author!: string;
  @Input() isbn!: string;
  @Input() publisher!: string;
  @Input() createdAt!: string;
  @Input() updatedAt!: any;
  @Output() editData = new EventEmitter<boolean>();
  @Output() deleteData = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  showModal(edit: boolean) {
    this.editData.emit(edit);
  }

  onDelete(del: boolean) {
    this.deleteData.emit(del);
  }
}
