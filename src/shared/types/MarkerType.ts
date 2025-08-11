export type CSVRow<T> = Record<keyof T, string>;
export interface SiteCSVData {
    site_id: string;
    site_name: string;
    longitude: string;
    latitude: string;
}
export interface CostCSVData {
    site_id_from: string;
    site_id_to: string;
    iwait: string;
    inveht: string;
    xpen: string;
    xnum: string;
    cost: string;
}
export type SiteCSVRow = CSVRow<SiteCSVData>;
export type CostCSVRow = CSVRow<CostCSVData>;
export interface MarkerType {
    id: number;
    name: string;
    position: [
        number,
        number
    ];
}
export interface CostData {
    cost: number;
    iwait: number;
    inveht: number;
    xnum: number;
    xpen: number;
}
export type MarkerWithCost = MarkerType & {
    costData?: CostData;
};
interface LoadingState {
    loading: boolean;
    error: string | null;
}
export interface MarkersState extends LoadingState {
    markers: MarkerType[];
}
export interface CostsState extends LoadingState {
    costsMap: Record<string, CostData>;
}
export interface SelectedMarkerState {
    selectedMarkerId: number | null;
}
export type MarkerWithCostDetails = MarkerWithCost;
export interface Cost {
    fromId: number;
    toId: number;
    cost: number;
    iwait: number;
    inveht: number;
    xnum: number;
    xpen: number;
}
