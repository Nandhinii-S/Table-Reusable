import { IProductEntityTableHeader } from "../../../../shared/interface/entity.interface";


export const productEntityTableHeader: IProductEntityTableHeader[] = [
  { title: 'S.NO', key: 'no', display: true, status: false, sort: false },
  { title: 'Name', key: 'name', display: true, status: false, sort: false },
  { title: 'Description', key: 'description', display: true, status: false, sort: false },
  { title: 'Created By', key: 'created_user_type', display: true, status: false, sort: false },
  { title: 'Action', key: 'actions', display: true, status: false, sort: false, edit: true, delete: true, view: true },
];
