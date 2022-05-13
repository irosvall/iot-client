import {Component, OnInit} from '@angular/core';
import {PlantService} from "../../services/plant.service";
import {first} from "rxjs";
import {PlantData} from "../../models/plant-data";
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-moisture-diagram',
  templateUrl: './moisture-diagram.component.html',
  styleUrls: ['./moisture-diagram.component.css']
})

/**
 * A component that displays the soil moisture of a plant over time in a diagram.
 */
export class MoistureDiagramComponent implements OnInit {
  lineChartValues: any[] = [];

  // Color scheme for the diagram.
  colorScheme: Color = {
    name: "colorScheme",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#35b7bb']
  };

  /**
   * Initializes a MoistureDiagramComponent.
   */
  constructor(private plantService: PlantService) {
  }

  /**
   * Executed when the component is initialized.
   * Gets all plant data.
   */
  ngOnInit(): void {
    this.plantService.getAllData().pipe(first())
      .subscribe(
        ((data: PlantData[]) => this.updateNgxLineChartValues(data))
      )
  }

  /**
   * Update the ngx-charts compatible array to show the plant data in the diagram.
   */
  private updateNgxLineChartValues(plantData: PlantData[]): void {
    this.lineChartValues.push({
      name: 'moisture',
      series: this.createLineChartSeries(plantData)
    });

    // copy array to activate change detection.
    this.lineChartValues = [...this.lineChartValues]
  }

  /**
   * Creates and returns line chart series from the plant data.
   */
  private createLineChartSeries(plantData: PlantData[]): any[] {
    return plantData.map((data: PlantData) => {
      return {
        name: new Date(data._time),
        value: data._value
      }
    })
  }
}
