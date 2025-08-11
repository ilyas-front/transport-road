export type CostCategory = 'unreachable' | 'low' | 'medium' | 'high' | 'very_high';

export const MAP_CONFIG = {
    CENTER: [55.7558, 37.6176] as [
        number,
        number
    ],
    ZOOM: 13,
    MIN_ZOOM: 10,
    MAX_ZOOM: 18,
} as const;
export const COLORS = {
    COST_RANGES: {
        LOW: '#4ade80',
        MEDIUM: '#facc15',
        HIGH: '#ef4444',
        VERY_HIGH: '#7c3aed',
        UNREACHABLE: '#000000',
    },
    SELECTED: '#3b82f6',
    DEFAULT: '#6b7280',
} as const;
export const COST_THRESHOLDS = {
    LOW: 5,
    MEDIUM: 15,
    HIGH: 30,
} as const;


export const COST_CATEGORIES: Record<CostCategory, {
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