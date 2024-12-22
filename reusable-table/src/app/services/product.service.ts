import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviornments/enviornment';
import { ApiResponse } from '../../shared/interface/api-schema.interface';
import { ProductEntity } from '../../shared/interface/entity.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl!: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
  /**
  * Helper method to retrieve user base URL from local storage
  */
  private getUserRoleBaseUrl(): string {
    return this.localStorageService.getDataByKey('user_details').data.base_url;
  }

  /**
   * Gets product entity list
   * @param userId
   * @param [page]
   * @param [limit]
   * @param [search]
   * @returns product entity list
   */
  getProductEntityList(userId: string, page?: number, limit?: number, search?: string): Observable<ApiResponse<ProductEntity[]>> {
    this.baseUrl = `${environment.API_BASE_URL}${this.getUserRoleBaseUrl()}/product-blueprint`;
    const queryParams = `?page=${page || ''}&limit=${limit || ''}&search=${search || ''}`;
    return this.http.get<ApiResponse<ProductEntity[]>>(`${this.baseUrl}/${userId}${queryParams}`);
  }
}
