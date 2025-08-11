

## 🔧 Что теперь известно:

### `sites.csv` (структура корректна):

* `id` — уникальный идентификатор остановки
* `name` — название остановки
* `lat`, `lon` — координаты

### `costs.csv` (требует очистки):

* `site_id_from` — ID начальной остановки
* `site_id_to` — ID конечной остановки
* `iwait` — время ожидания
* `inveht` — время в салоне
* `xpen` — штраф за пересадки
* `xnum` — число пересадок
* `cost` — агрегированные затраты

---

## 📦 Структура Redux Store

```ts
{
  stops: {
    list: Stop[];           // Загруженные остановки
    isLoading: boolean;
  };
  costs: {
    map: Record<string, TravelCost>;  // Ключ: `${from}_${to}`
    isLoading: boolean;
  };
  selection: {
    selectedStopId: number | null;    // ID выбранной остановки
  };
}
```

### Пример типов:

```ts
type Stop = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

type TravelCost = {
  from: number;
  to: number;
  cost: number | null;
  iwait: number;
  inveht: number;
  xnum: number;
  xpen: number;
};
```

---

## 🎨 Утилита для покраски остановок

```ts
export const getColorByCost = (cost: number | null): string => {
  if (cost === null || isNaN(cost)) return "#000000"; // чёрный
  if (cost <= 5) return "#00FF00"; // зелёный
  if (cost <= 15) return "#FFFF00"; // жёлтый
  if (cost <= 30) return "#FF0000"; // красный
  return "#4B0082"; // тёмно-фиолетовый
};
```

---

## 🗺️ Выбор библиотеки для отображения карты и остановок

### ✅ **Лучшее решение для твоего проекта:**

#### [`react-leaflet`](https://react-leaflet.js.org/)

* Основан на Leaflet.js
* Поддерживает кастомные иконки
* Прост в интеграции с React
* Масштабируемый (для 1000+ точек)

**Пример подключения:**

```bash
npm install leaflet react-leaflet
```

**Отображение карты и маркеров:**

```tsx
<MapContainer center={[55.75, 37.61]} zoom={12} style={{ height: "100vh" }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {stops.map(stop => (
    <Marker key={stop.id} position={[stop.lat, stop.lon]}>
      <Tooltip>{stop.name}</Tooltip>
    </Marker>
  ))}
</MapContainer>
```

---

## 🛠 Действия далее

1. 💥 Очистить и распарсить `costs.csv` (заменить `авг.78`, `июл.95` на числа).
2. ⚙️ Создать слайсы для `stops`, `costs`, `selection`.
3. 🗺️ Настроить `react-leaflet` с кастомной логикой выбора/подсветки.
4. 📦 Загрузить `sites.csv` и `costs.csv` из `public/` при инициализации.

