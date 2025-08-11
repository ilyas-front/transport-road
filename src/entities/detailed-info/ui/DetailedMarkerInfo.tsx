import React from 'react';
import { MarkerWithCost } from '@/shared/types/MarkerType';
interface DetailedMarkerInfoProps {
  marker: MarkerWithCost;
  isSelectedMarker: boolean;
  className?: string;
}
const DetailedMarkerInfoComponent: React.FC<DetailedMarkerInfoProps> = ({ marker, isSelectedMarker, className = '' }) => {
  return (<div className={`bg-white rounded-lg shadow-md p-3 min-w-64 ${className}`}>
    <h3 className="font-semibold text-gray-900 mb-1">{marker.name}</h3>
    <p className="text-sm text-gray-600 mb-2">ID: {marker.id}</p>

    <div className="border-t pt-2 space-y-2">
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Параметры перемещения:
      </h4>

      {marker.costData ? (<div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Агрегированные затраты:</span>
          <span className="font-medium text-blue-600">
            {marker.costData.cost} мин
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Время ожидания:</span>
          <span className="font-medium">
            {marker.costData.iwait} мин
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Время в салоне:</span>
          <span className="font-medium">
            {marker.costData.inveht} мин
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Число пересадок:</span>
          <span className="font-medium">
            {marker.costData.xnum}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Штраф за пересадки:</span>
          <span className="font-medium">
            {marker.costData.xpen} мин
          </span>
        </div>
      </div>) : (<div className="text-sm text-gray-600">
        {isSelectedMarker ? 'Это выбранная точка' : 'Недоступно'}
      </div>)}
    </div>

    <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
      {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
    </div>
  </div>);
};

export const DetailedMarkerInfo = React.memo(DetailedMarkerInfoComponent);
