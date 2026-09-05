import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

});

export default function DonationMap({
  donations,
}) {

  return (

    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={10}
      style={{
        height: "350px",
        width: "100%",
      }}
      className="rounded-3xl"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {donations.map((item, index) => (

        <Marker
          key={index}
          position={[
            13.0827 + Math.random() * 0.05,
            80.2707 + Math.random() * 0.05,
          ]}
        >

          <Popup>

            <div>

              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                alt=""
                className="w-full h-[120px] object-cover rounded-lg mb-2"
              />

              <h2 className="font-bold text-lg">
                {item.foodName}
              </h2>

              <p>
                {item.quantity}
              </p>

              <p>
                {item.address}
              </p>

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );
}
