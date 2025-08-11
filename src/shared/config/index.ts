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
