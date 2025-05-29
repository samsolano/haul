import React from "react";

export default function ProfilePage() {
  // Fake data
  const store = {
    name: "Urban Outfitters",
    description: "Trendy clothing, accessories, and home decor.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    recentlyFound: [
      {
        item: "Vintage Denim Jacket",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      },
      {
        item: "Corduroy Tote Bag",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-600 bg-opacity-70 rounded-lg p-8 w-[90vw] max-w-5xl min-h-[70vh] flex items-center justify-end">
          <div className="bg-white rounded-2xl border-4 border-blue-400 shadow-lg w-96 p-6 flex flex-col items-center">
            <img
              src={store.image}
              alt="Store"
              className="w-64 h-40 object-cover rounded-md mb-4 border border-gray-200 shadow"
            />
            <div className="text-2xl font-bold text-gray-800 mb-2 text-center">{store.name}</div>
            <div className="text-gray-600 text-center mb-4">{store.description}</div>
            <hr className="w-full border-gray-400 my-4" />
            <div className="text-xl font-semibold text-gray-800 mb-2 text-center">Recently Found Here:</div>
            <div className="flex flex-col gap-4 w-full items-center">
              {store.recentlyFound.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 w-full bg-gray-100 rounded-lg p-2 shadow">
                  <img
                    src={item.image}
                    alt={item.item}
                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                  />
                  <div className="text-gray-800 font-medium">{item.item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
