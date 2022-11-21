import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { HomepageService } from '../../homepage.service';
import { Book } from '../../homepage.type';
import { AddBookComponent } from '../add-book/add-book.component';
import { Title } from '@angular/platform-browser';

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
    private dialog: MatDialog,
    private ts: Title
  ) {}

  ngOnInit(): void {
    this.ts.setTitle('DevFest - Home')
    this.getBookList();


  }

  /**
   * Open modal add book
   * @param bookData
   */
  createBook(bookData?:Book) {
    this.dialog.open(AddBookComponent, {
      data: bookData,
      width: '100%',
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

  /**
   * Delete book by ID
   * @param id
   */
  async deleteBook(id: number){
    try {
      this.ls.setLoading(true)
      const r = await this.hs.deleteBook(id)
      if(r.status == 204) {
        this.ls.setNotification({
          message: "Removed Successfully",
          color: 'accent'
        })
        this.getBookList()
      }
    } catch (err) {
      this.ls.catchError(err)
    } finally {
      this.ls.setLoading(false)
    }
  }
}
