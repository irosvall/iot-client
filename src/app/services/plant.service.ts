import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment as env } from '../../environments/environment';
import {PlantData} from "../models/plant-data";

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  /**
   * Initializes a PlantService.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Gets all the sensor data for the plant.
   */
  getAllData(): Observable<PlantData[]> {
    return this.http.get<PlantData[]>(`${env.API_URL}/plant-details`)
  }
}
