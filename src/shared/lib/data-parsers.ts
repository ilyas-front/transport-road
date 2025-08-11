import { SiteCSVRow, CostCSVRow, MarkerType, CostData } from '@/shared/types/MarkerType';

export const parseMarkerFromCSV = (row: SiteCSVRow): MarkerType => {
    const lat = Number.parseFloat(row.latitude);
    const lng = Number.parseFloat(row.longitude);
    const result = {
        id: Number(row.site_id),
        name: row.site_name,
        position: [lat, lng] as [
            number,
            number
        ],
    };
    return result;
};
export const parseCostFromCSV = (row: CostCSVRow): CostData & {
    fromId: number;
    toId: number;
} => ({
    fromId: Number(row.site_id_from),
    toId: Number(row.site_id_to),
    cost: Number.parseInt(row.cost),
    iwait: Number.parseInt(row.iwait),
    inveht: Number.parseInt(row.inveht),
    xnum: Number.parseInt(row.xnum),
    xpen: Number.parseInt(row.xpen),
});

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

export const getCostDataBetweenStops = (fromId: number, toId: number, costsMap: Record<string, CostData>): CostData | undefined => {
    const key = `${fromId}-${toId}`;
    return costsMap[key];
};
