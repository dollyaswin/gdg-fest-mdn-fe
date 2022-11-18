import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { HomepageService } from '../../homepage.service';
import { Book } from '../../homepage.type';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public bookList!: Book[];

  showAddTop = true

  constructor(
    private hs: HomepageService,
    private ls: LayoutService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBookList();


  }

  createBook(bookData?:Book) {
    this.dialog.open(AddBookComponent, {
      data: bookData,
      width: '50vw',
      height: 'auto',
      disableClose: true,
    }).afterClosed().subscribe((resp) => {
      this.getBookList()
    })
  }

  /**
   * Fetch data books from server
   */
  async getBookList() {
    this.ls.setLoading(true);
    try {
      const response = await this.hs.fetchBook();
      if (response.status === 200) {
        this.ls.setLoading(false);
        this.bookList = response.body;
      }
    } catch (error) {
      this.ls.catchError(error);
      this.ls.setLoading(false)
    }
  }
}
