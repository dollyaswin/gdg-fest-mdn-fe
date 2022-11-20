import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddNewBook, Book } from './homepage.type';
import { lastValueFrom } from 'rxjs';


/**
 *
 * Author : Riki Joni Iskandar
 * email: rikijoniiskandar97@gmail.com
 *
 */

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch book data from server
   * @returns []
   * @operator rxjs lastValueFrom for more documentation see https://rxjs.dev/api/index/function/lastValueFrom
   * @observe 'response' for more documentation see https://angular.io/api/common/http/HttpClient
   */
  public fetchBook(): Promise<any> {
    return lastValueFrom(
      this.http.get<Book[]>(`/v1/book`, {
        observe: 'response',
      })
    );
  }

  /**
   * Post new book to server
   * @param data typeof AddNewBook
   */
  public createNewBook(data: AddNewBook): Promise<Book> {
    return lastValueFrom(this.http.post<Book>(`/v1/book`, data));
  }

  /**
   * Put data by id
   * @param id
   * @param data
   */
  public updateBook(data: AddNewBook, id: number): Promise<Book> {
    return lastValueFrom(
      this.http.put<Book>(`/v1/book/${id}`, data)
    );
  }

  /**
   * Delete from server
   * @param id
   */
  public deleteBook(id: number) {
    return lastValueFrom(this.http.delete(`/v1/book/${id}`, { observe: 'response'}));
  }
}

