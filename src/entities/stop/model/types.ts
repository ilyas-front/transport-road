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
export interface Stop {
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
export type StopWithCost = Stop & {
    costData?: CostData;
};
interface LoadingState {
    loading: boolean;
    error: string | null;
}
export interface StopsState extends LoadingState {
    stops: Stop[];
}
export interface CostsState extends LoadingState {
    costsMap: Record<string, CostData>;
}
export interface SelectedStopState {
    selectedStopId: number | null;
}
export type StopWithCostDetails = StopWithCost;
export interface Cost {
    fromId: number;
    toId: number;
    cost: number;
    iwait: number;
    inveht: number;
    xnum: number;
    xpen: number;
}
