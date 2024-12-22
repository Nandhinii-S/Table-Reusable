export interface ProductEntity {
  brand_account_id: string;
  created_user_type: string;
  created_by: string;
  name: string;
  description: string;
  _id: string;
  product_entity_data: ProductEntityField[];
}

export interface ProductEntityField {
  // Define the structure of the fields in the array
  _id: string;
  name: string;
  type: string;
  required: boolean;
  reg_ex: string;
  allow_special_characters: boolean;
  min: string;
  max: string;
  max_size: number;
  allowed_extensions: string;
  options: OptionField[];
  key: string;
  errorMessage?: string;
}

export interface OptionField {
  dropdown: string;
}

// Define the structure of the API response
export interface ProductEntityListResponse {
  data: {
    _docs: ProductEntity[];  // Array of ProductEntity objects under the _docs property
  };
}

export interface ProcessEntity {
  brand_account_id: string;
  created_user_type: string;
  created_by: string;
  name: string;
  description: string;
  process_entity_data?: [];
  _id: string;
}
/**
 * product entity table header
 */
export interface IProductEntityTableHeader {
  title: string;
  key: keyof BluePrintData;
  display: boolean;
  status?: boolean;
  sort?: boolean;
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
}
/**
 * Blue print data
 */
export interface BluePrintData {
  brand_account_id: string;
  company_id: string;
  created_at: string;
  created_by: string;
  created_user_type: string;
  description: string;
  name: string;
  product_entity_ids: [];
  updated_at: string;
  _id: string,
  actions?: string;
  no?: number;
}
