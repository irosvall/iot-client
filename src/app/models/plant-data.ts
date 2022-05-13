/**
 * Model for plant data
 */
export interface PlantData {
  _value: number
  _field: FieldType
  _time: string
}

export enum FieldType {
  Moisture = 'moisture'
}
