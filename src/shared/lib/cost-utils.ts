import { COLORS, COST_THRESHOLDS } from '../config';
type CostCategory = 'unreachable' | 'low' | 'medium' | 'high' | 'very_high';
const COST_CATEGORIES: Record<CostCategory, {
    color: string;
    label: string;
    timeLabel: string;
}> = {
    unreachable: {
        color: COLORS.COST_RANGES.UNREACHABLE,
        label: 'Нельзя доехать',
        timeLabel: 'Недоступно'
    },
    low: {
        color: COLORS.COST_RANGES.LOW,
        label: 'Быстро',
        timeLabel: 'мин'
    },
    medium: {
        color: COLORS.COST_RANGES.MEDIUM,
        label: 'Средне',
        timeLabel: 'мин'
    },
    high: {
        color: COLORS.COST_RANGES.HIGH,
        label: 'Долго',
        timeLabel: 'мин'
    },
    very_high: {
        color: COLORS.COST_RANGES.VERY_HIGH,
        label: 'Очень долго',
        timeLabel: 'мин'
    },
} as const;
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
