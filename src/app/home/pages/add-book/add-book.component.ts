import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { HomepageService } from '../../homepage.service';
import { Book } from '../../homepage.type';

@Component({
  selector: 'app-add-book',
  template: `
    <div class="flex justify-between items-center mx-auto text-slate-800">
      <span class="text-base font-medium ">{{ title }}</span>
      <a mat-icon-button [matDialogClose]="true">
        <mat-icon class="text-base font-medium">close</mat-icon>
      </a>
    </div>
    <form [formGroup]="newBook" (ngSubmit)="saveBook()">
      <div class="grid grid-cols-2 gap-4">
        <mat-form-field appearance="legacy" class="w-full">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" />
          <mat-error *ngIf="newBook.invalid"
            >title must be enter a value</mat-error
          >
        </mat-form-field>
        <mat-form-field appearance="legacy" class="w-full">
          <mat-label>ISBN</mat-label>
          <input matInput formControlName="isbn" />
          <mat-error *ngIf="newBook.invalid"
            >isbn must be enter a value</mat-error
          >
        </mat-form-field>
        <mat-form-field appearance="legacy" class="w-full">
          <mat-label>Author</mat-label>
          <input matInput formControlName="author" />
          <mat-error *ngIf="newBook.invalid"
            >author must be enter a value</mat-error
          >
        </mat-form-field>
        <mat-form-field appearance="legacy" class="w-full">
          <mat-label>Publisher</mat-label>
          <input matInput formControlName="publisher" />
          <mat-error *ngIf="newBook.invalid"
            >publisher must be enter a value</mat-error
          >
        </mat-form-field>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          color="primary"
          [disabled]="!newBook.valid"
          mat-flat-button
        >
          Save
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  title: string = 'Add new book';
  isEdit: boolean = false;
  currentId!: number;

  newBook: FormGroup;

  constructor(
    private ls: LayoutService,
    private homeService: HomepageService,
    @Inject(MAT_DIALOG_DATA) private dialogData: Book,
    private dialog: MatDialog
  ) {
    if(dialogData !== undefined && dialogData !== null) {
      this.isEdit = true
      this.title = 'Update book';
      this.currentId = dialogData.id
      this.initCurrentValue()
    }

    this.newBook = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      isbn: new FormControl(null),
      publisher: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  public async saveBook(): Promise<void> {
    try {
      this.ls.setLoading(true);
      const data = this.newBook.value;
      this.newBook.disable();
      const { title } = await (this.isEdit ? this.homeService.updateBook(data) : this.homeService.createNewBook(data))
      console.log('d', title);
      this.ls.setNotification({
        message: `Book '${title}' successfully ${this.isEdit ? 'updated' : 'created'}`,
        color: 'accent'
      })
      this.dialog.closeAll()
    } catch (error) {
      this.ls.catchError(error);
      this.newBook.enable()
    } finally {
      this.ls.setLoading(false);
    }
  }

  initCurrentValue(){
    const r = this.dialogData
    this.newBook.patchValue({
      title: r.title,
      author: r.author,
      isbn: r.isbn,
      publisher: r.publisher,
    })
  }
}
