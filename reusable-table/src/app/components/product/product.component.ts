import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { IProductEntityTableHeader, ProductEntity } from '../../../shared/interface/entity.interface';
import { ProductService } from '../../services/product.service';
import { TableComponent } from '../table/table.component';
import { ProductEntityHelper } from './helper/product-entity.helper';
import { productEntityTableHeader } from './store/product-entity';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule, TableComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  protected entityList!: ProductEntity[];
  protected isLoading = signal(false);
  protected isDeleteLoading = signal(false);
  protected userId: string = '';
  protected isDeleteModalVisible: boolean = false;
  protected currentItemId: string | null = null;
  protected currentItemName: string | null = null;
  protected previous: boolean = false;
  protected next: boolean = false;
  protected limit: number = 10;
  protected totalItems: number = 0;
  protected totalPages: number = 0;
  protected pageNumbers: number = 0;
  protected startingIndex: number = 0;
  protected apiUrl: string = "product";
  protected currentPage = 1;
  protected search: string = '';
  permissions: any;
  user!: string;
  // userType = UserType;
  tableHeader: IProductEntityTableHeader[] = productEntityTableHeader;
  accessList: any
  // moduleName = AccessKey;
  //   protected breadcrumbs = computed<BreadcrumbItem[]>(() => [
  //     {
  //       label: 'Entity Management',
  //       path: '/entity-management/product',
  //       icon: `<svg aria-hidden="true"
  //      class="flex-shrink-0 w-5 h-5 me-2 sm:me-2.5 gap-2 text-green-800 dark:text-green-700"
  //      fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  //     <path fill-rule="evenodd"
  //         d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
  //         clip-rule="evenodd"></path>
  // </svg>

  // `,
  //     },
  //     {
  //       label: 'List Product Entity',
  //       path: '/entity-management/product',
  //       icon: `<svg
  //     class="flex-shrink-0 w-5 h-5 me-2 sm:me-2.5 gap-2 text-green-800 dark:text-green-700 transition duration-75 group-hover:text-green-600 dark:group-hover:text-white"
  //     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
  //     viewBox="0 0 24 24">
  //     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
  //         d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
  // </svg>
  // `,
  //     },
  //   ]);
  selectedCompanyId!: string;
  constructor(
    private readonly productEntityService: ProductService,
    // private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly productEntityHelper: ProductEntityHelper
  ) { }

  ngOnInit(): void {
    // this.userId = this.localStorageService.getDataByKey('user_details').data._id;
    // this.permissions = this.localStorageService.getDataByKey('user_details').data.permission;
    // this.user = this.localStorageService.getDataByKey('user_type');
  }




  /**
   * Gets the list of product entities for the given user id
   * @param id the user id to get the list of product entities
   */
  protected getEntityList(id: string) {
    // Set loading state to true
    this.isLoading.set(true);
    // Call the getProductEntityList service with the user id
    this.productEntityService.getProductEntityList(id, this.currentPage, this.limit, this.search).subscribe({
      // On success, set the entity list and set the loading state to false
      next: (response: any) => {
        this.isLoading.set(false);
        // Access the _docs property correctly
        this.startingIndex = response.data.pagination.pagingCounter;
        this.entityList = this.productEntityHelper.listProductEntityDetails(response.data._docs, this.startingIndex);
        console.log('entityList', this.entityList);

        this.previous = response.data.pagination.hasPrevPage;
        this.next = response.data.pagination.hasNextPage;
        this.totalPages = response.data.pagination.totalPages;
        this.totalItems = response.data.pagination.totalDocs;

      },
      // On error, set the loading state to false
      error: (error) => {
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Edit a product entity
   * @param id the id of the product entity to edit
   */
  protected editProductEntity(event: any) {
    // Navigate to the edit product entity page with the id
    this.router.navigate([`/entity-management/product/edit-product-entity/${event._id}`]);
  }



  /**
   * Lists product entity component
   * @param list
   */
  protected list(list: any) {
    this.entityList = list;
    this.entityList = this.productEntityHelper.listProductEntityDetails(this.entityList, this.startingIndex);

  }

  /**
   * Sets starting index
   * @param index
   */
  protected setStartingIndex(index: any) {
    this.startingIndex = index;
  }

  /**
   * Determines whether page change on
   * @param page
   */
  protected onPageChange(page: any) {
    this.currentPage = page;
    this.getEntityList(this.selectedCompanyId)
  }


}
