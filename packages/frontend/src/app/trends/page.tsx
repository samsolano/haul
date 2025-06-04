import React from "react";

// const editorsPicks = [
//   {
//     title: "Top Summer Trends",
//     link: "#",
//   },
//   {
//     title: "Best Vintage Finds",
//     link: "#",
//   },
// ];

const hottestStores = [
  {
    city: "LA",
    name: "Melrose Trading Post",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    city: "SD",
    name: "Pigment",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    city: "OC",
    name: "The LAB Anti-Mall",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    city: "SF",
    name: "Painted Ladies Market",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

const hottestPieces = [
  {
    name: "Straw Tote Bag",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Chunky Sandals",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Retro Sunglasses",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Floral Dress",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Wide-Leg Jeans",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Bucket Hat",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
];

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-white px-8 py-8">
      {/* Top Section */}
      <div className="flex flex-row gap-12 mb-12 items-start justify-center">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
          alt="Editor's Pick"
          className="w-[350px] h-[220px] object-cover rounded-lg shadow-lg border-4 border-[#53221b]"
        />
        {/* <div>
          <h2 className="text-3xl font-bold underline text-[#53221b] mb-4">Editor's Picks of the Month:</h2>
          <ul className="space-y-3">
            {editorsPicks.map((pick, idx) => (
              <li key={idx}>
                <a href={pick.link} className="text-xl text-blue-800 underline hover:text-blue-500 font-medium">
                  {pick.title}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Hottest Stores Section */}
      <h2 className="text-4xl font-bold mb-6 text-[#1a1a1a]">Hottest Stores Near Los Angeles</h2>
      <div className="flex flex-row gap-6 mb-12 overflow-x-auto">
        {hottestStores.map((store, idx) => (
          <div key={idx} className="relative rounded-lg overflow-hidden shadow-lg flex-1 min-w-[120px] max-w-[260px]">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-2 left-2 text-2xl font-bold text-white drop-shadow-lg">{store.city}</div>
            <div className="absolute bottom-2 right-2 text-lg font-semibold text-white drop-shadow-lg hidden md:block">{store.name}</div>
            <div className="absolute inset-0 bg-[#53221b] opacity-60" />
          </div>
        ))}
      </div>

      {/* Hottest Pieces Section */}
      <h2 className="text-3xl font-bold mb-6 text-[#1a1a1a]">Summer To-Go: Hottest Pieces</h2>
      <div className="flex flex-row gap-6 flex-wrap">
        {hottestPieces.map((piece, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-[#53221b] flex flex-col items-center justify-center min-w-[120px] max-w-[200px] w-40 h-28">
            <img
              src={piece.image}
              alt={piece.name}
              className="w-full h-16 object-cover mb-1"
            />
            <span className="text-white font-semibold text-sm text-center px-2">{piece.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
