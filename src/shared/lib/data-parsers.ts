import { SiteCSVRow, CostCSVRow, MarkerType, CostData, Cost } from '@/shared/types/MarkerType';
const createParser = <T extends number>(parser: (value: string) => T, shouldRound: boolean = false) => (value: string): T => {
    if (!value || value === '')
        return 0 as T;
    const cleanValue = value.replace(',', '.');
    const parsed = parser(cleanValue);
    const result = isNaN(parsed) ? 0 : parsed;
    return (shouldRound ? Math.round(result) : result) as T;
};
const parseFloatValue = createParser((v: string) => Number.parseFloat(v), false);
const parseIntValue = createParser((v: string) => Number.parseInt(v, 10), false);
const parseRoundedFloat = createParser((v: string) => Number.parseFloat(v), true);
export const parseMarkerFromCSV = (row: SiteCSVRow): MarkerType => {
    const lat = parseFloatValue(row.latitude);  
    const lng = parseFloatValue(row.longitude);
    const result = {
        id: parseIntValue(row.site_id),
        name: row.site_name,
        position: [lat, lng] as [
            number,
            number  
        ],
    };
    if (result.id <= 1660) {
        console.log('🔍 parseMarkerFromCSV Debug:', {
            raw: { lat: row.latitude, lng: row.longitude },
            parsed: { lat, lng },
            result: result.position,
            id: result.id
        });
    }
    return result;
};
export const parseCostDataFromCSV = (row: CostCSVRow): CostData & {
    fromId: number;
    toId: number;
} => ({
    fromId: parseIntValue(row.site_id_from),
    toId: parseIntValue(row.site_id_to),
    cost: parseRoundedFloat(row.cost),
    iwait: parseRoundedFloat(row.iwait),
    inveht: parseRoundedFloat(row.inveht),
    xnum: parseRoundedFloat(row.xnum),
    xpen: parseRoundedFloat(row.xpen),
});
export const parseCostFromCSV = parseCostDataFromCSV;
export const createCostsMap = (costs: Array<CostData & {
    fromId: number;
    toId: number;
}>): Record<string, CostData> => {
    const map: Record<string, CostData> = {};
    costs.forEach(({ fromId, toId, ...costData }) => {
        const key = `${fromId}-${toId}`;
        map[key] = costData;
    });
    return map;
};
export const createDetailedCostsMap = (costs: Cost[]): Record<string, Cost> => {
    const map: Record<string, Cost> = {};
    costs.forEach(cost => {
        const key = `${cost.fromId}-${cost.toId}`;
        map[key] = cost;
    });
    return map;
};
export const getCostDataBetweenStops = (fromId: number, toId: number, costsMap: Record<string, CostData>): CostData | undefined => {
    const key = `${fromId}-${toId}`;
    return costsMap[key];
};
export const getCostBetweenStops = (fromId: number, toId: number, costsMap: Record<string, CostData>): number | undefined => {
    return getCostDataBetweenStops(fromId, toId, costsMap)?.cost;
};
export const getDetailedCostBetweenStops = (fromId: number, toId: number, detailedCostsMap: Record<string, Cost>): Cost | undefined => {
    const key = `${fromId}-${toId}`;
    return detailedCostsMap[key];
};
