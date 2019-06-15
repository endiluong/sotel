import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { environment } from '@env/environment';
import { InventoryItem } from '../models/inventory-item.model';

const API_INVENTORIES_URL = 'api/inventories';

@Injectable()
export class InventoriesService {
  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}


  // ==========================================
  // =            Business Methods            =
  // ==========================================

  // READ
  getAllInventories(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(API_INVENTORIES_URL);
  }

  getInventoryById(inventoryId: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(API_INVENTORIES_URL + `/${inventoryId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findInventories(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return environment.isMockEnabled ? this.findFakeInventories(queryParams) : this.findRealInventories(queryParams);
  }

  // Fake REST API (Mock)
  findFakeInventories(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    const url = API_INVENTORIES_URL;
    return this.http.get<InventoryItem[]>(API_INVENTORIES_URL).pipe(mergeMap(res => of(new QueryResultsModel(res))));
  }

  // Real REST API
  // Server should return filtered/sorted result
  findRealInventories(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url = API_INVENTORIES_URL + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // UPDATE => PUT: update the inventory on the server
  updateInventory(inventory: InventoryItem): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(API_INVENTORIES_URL, inventory, { headers: httpHeader });
  }


  // UPDATE Description
  updateDescriptionForInventory(inventories: InventoryItem[], description: string): Observable<any> {
    return environment.isMockEnabled
      ? this.updateDescriptionForFakeInventory(inventories, description)
      : this.updateDescriptionForRealInventory(inventories, description);
  }

  // Fake REST API (Mock)
  // This code emulates server calls
  updateDescriptionForFakeInventory(inventories: InventoryItem[], description: string): Observable<any> {
    const tasks$ = [];
    for (let i = 0; i < inventories.length; i++) {
      const _inventory = inventories[i];
      _inventory.description = description;
      tasks$.push(this.updateInventory(_inventory));
    }
    return forkJoin(tasks$);
  }

  // Real REST API
  updateDescriptionForRealInventory(inventories: InventoryItem[], description: string): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      inventoriesForUpdate: inventories,
      newDescription: description
    };
    const url = API_INVENTORIES_URL + '/updateDescription';
    return this.http.put(url, body, { headers: httpHeaders });
  }

  // DELETE => delete the inventory from the server
  deleteInventory(inventoryId: string): Observable<InventoryItem> {
    const url = `${API_INVENTORIES_URL}/${inventoryId}`;
    return this.http.delete<InventoryItem>(url);
  }

  deleteInventories(ids: string[] = []): Observable<any> {
    return environment.isMockEnabled ? this.deleteFakeInventories(ids) : this.deleteRealInventories(ids);
  }

  // Fake REST API (Mock)
  // This code emulates server calls
  deleteFakeInventories(ids: string[] = []): Observable<any> {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.deleteInventory(ids[i]));
    }
    return forkJoin(tasks$);
  }

  // Real REST API
  deleteRealInventories(ids: string[] = []): Observable<any> {
    const url = API_INVENTORIES_URL + '/deleteInventories';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = { inventoryIdsForDelete: ids };
    return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders });
  }
}
