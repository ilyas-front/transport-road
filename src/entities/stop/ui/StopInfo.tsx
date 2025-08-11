import React from 'react';
import { Stop } from '../model/types';
import { formatCostTime, getCostLabel } from '@/shared/lib';
interface StopInfoProps {
    stop: Stop & {
        cost?: number;
    };
    className?: string;
}
export const StopInfo: React.FC<StopInfoProps> = ({ stop, className = '' }) => {
    return (<div className={`bg-white rounded-lg shadow-md p-3 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-1">{stop.name}</h3>
      <p className="text-sm text-gray-600 mb-2">ID: {stop.id}</p>
      
      {stop.cost !== undefined && (<div className="border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Время в пути:</span>
            <span className="font-medium text-blue-600">
              {formatCostTime(stop.cost)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-600">Оценка:</span>
            <span className="text-sm font-medium">
              {getCostLabel(stop.cost)}
            </span>
          </div>
        </div>)}
      
      <div className="text-xs text-gray-500 mt-2">
        {stop.position[0].toFixed(4)}, {stop.position[1].toFixed(4)}
      </div>
    </div>);
};
