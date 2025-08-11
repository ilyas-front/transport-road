import L from "leaflet";
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';


const iconCache = new Map<string, L.DivIcon>();

export const createMarkerIcon = (color: string, isSelected: boolean = false): L.DivIcon => {
  const key = `${color}-${isSelected}`;
  if (iconCache.has(key)) {
    return iconCache.get(key)!;
  }
  const size = isSelected ? 14 : 10;
  const stroke = isSelected ? 3 : 2;
  try {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: ${stroke}px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [size + stroke * 2, size + stroke * 2],
      iconAnchor: [size / 2 + stroke, size / 2 + stroke],
    });
    iconCache.set(key, icon);
    return icon;
  }
  catch (error) {
    console.error('createMarkerIcon Error:', error);
    return new L.Icon.Default();
  }
};
