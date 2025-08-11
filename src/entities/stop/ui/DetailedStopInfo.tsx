import React from 'react';
import { StopWithCost } from '../model/types';
interface DetailedStopInfoProps {
    stop: StopWithCost;
    isSelectedStop: boolean;
    className?: string;
}
const DetailedStopInfoComponent: React.FC<DetailedStopInfoProps> = ({ stop, isSelectedStop, className = '' }) => {
    return (<div className={`bg-white rounded-lg shadow-md p-3 min-w-64 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-1">{stop.name}</h3>
      <p className="text-sm text-gray-600 mb-2">ID: {stop.id}</p>
      
      <div className="border-t pt-2 space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Параметры перемещения:
        </h4>
        
        {stop.costData ? (<div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Агрегированные затраты:</span>
              <span className="font-medium text-blue-600">
                {stop.costData.cost} мин
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Время ожидания:</span>
              <span className="font-medium">
                {stop.costData.iwait} мин
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Время в салоне:</span>
              <span className="font-medium">
                {stop.costData.inveht} мин
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Число пересадок:</span>
              <span className="font-medium">
                {stop.costData.xnum}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Штраф за пересадки:</span>
              <span className="font-medium">
                {stop.costData.xpen} мин
              </span>
            </div>
          </div>) : (<div className="text-sm text-gray-600">
            {isSelectedStop ? 'Это выбранная точка' : 'Недоступно'}
          </div>)}
      </div>
      
      <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
        {stop.position[0].toFixed(4)}, {stop.position[1].toFixed(4)}
      </div>
    </div>);
};
export const DetailedStopInfo = React.memo(DetailedStopInfoComponent);
