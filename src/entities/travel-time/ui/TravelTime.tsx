import React from 'react';
interface TravelTimeItem {
    color: string;
    label: string;
    id: string;
}
interface TravelTimeProps {
    className?: string;
    title?: string;
    customItems?: TravelTimeItem[];
}
const DEFAULT_ITEMS: TravelTimeItem[] = [
    {
        id: 'fast',
        color: 'bg-green-400',
        label: '≤ 5 мин - Быстро'
    },
    {
        id: 'medium',
        color: 'bg-yellow-400',
        label: '5-15 мин - Средне'
    },
    {
        id: 'slow',
        color: 'bg-red-400',
        label: '15-30 мин - Долго'
    },
    {
        id: 'very-slow',
        color: 'bg-purple-600',
        label: '> 30 мин - Очень долго'
    },
    {
        id: 'unavailable',
        color: 'bg-black',
        label: 'Недоступно'
    }
];
export const TravelTime: React.FC<TravelTimeProps> = ({ className = '', title = 'Время в пути', customItems }) => {
    const legendItems = customItems || DEFAULT_ITEMS;
    return (<div className={`absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-40 max-w-xs ${className}`}>
        <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>

        <div className="space-y-2 text-sm">
            {legendItems.map((item) => (<div key={item.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span>{item.label}</span>
            </div>))}

            <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                <span className="font-medium">Выбранная остановка</span>
            </div>
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-gray-600">
            <p>Кликните по остановке для расчета времени до всех остальных точек</p>
        </div>
    </div>);
};
