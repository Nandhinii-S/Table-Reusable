import { HttpStatusCode } from "@angular/common/http";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: HttpStatusCode;
  pagination?: {}
}
