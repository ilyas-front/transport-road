import { COST_CATEGORIES, COST_THRESHOLDS, CostCategory } from '@/shared/const/cost';


const categorizeCost = (cost?: number): CostCategory => {
    if (cost === undefined || cost === null)
        return 'unreachable';
    if (cost <= COST_THRESHOLDS.LOW)
        return 'low';
    if (cost <= COST_THRESHOLDS.MEDIUM)
        return 'medium';
    if (cost <= COST_THRESHOLDS.HIGH)
        return 'high';
    return 'very_high';
};
export const getCostColor = (cost?: number): string => COST_CATEGORIES[categorizeCost(cost)].color;
export const getCostLabel = (cost?: number): string => COST_CATEGORIES[categorizeCost(cost)].label;
export const formatCostTime = (cost?: number): string => {
    const category = categorizeCost(cost);
    if (category === 'unreachable') {
        return COST_CATEGORIES[category].timeLabel;
    }
    return `${cost} ${COST_CATEGORIES[category].timeLabel}`;
};
export const getCostCategoryInfo = (cost?: number) => {
    const category = categorizeCost(cost);
    return {
        category,
        ...COST_CATEGORIES[category],
        cost,
    };
};
