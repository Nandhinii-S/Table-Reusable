import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductEntityHelper {
    constructor() { }

    /**
     * Lists process manager details
     * @param companyData 
     * @returns  
     */
    public listProductEntityDetails(productEntityData: any, startingIndex: any) {
        return productEntityData.map((result: any, index: number) => ({
            no: startingIndex + index,
            _id: result._id,
            name: result.name,
            description: result.description,
            created_user_type: result.created_user_type,
        }));
    }


}
