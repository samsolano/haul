'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserProfile } from "@frontend/src/types";

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Replace with actual API call
        const exampleProfile: UserProfile = {
          username: "strawberrythrift123",
          avatar: "/default-avatar.png",
          bio: "I love clothing!",
          stats: {
            posts: 17,
            followers: 100,
            following: 215
          },
          finds: [
            {
              id: "1",
              imageUrl: "/placeholder-find.jpg",
              title: "Vintage Denim Jacket",
              price: 25.99,
              location: "ThriftStore NYC",
              createdAt: new Date().toISOString()
            },
            {
              id: "2",
              imageUrl: "/placeholder-find2.jpg",
              title: "Retro Floral Dress",
              price: 30.00,
              location: "ThriftStore LA",
              createdAt: new Date().toISOString()
            },
            {
              id: "3",
              imageUrl: "/placeholder-find3.jpg",
              title: "Classic Leather Boots",
              price: 45.50,
              location: "ThriftStore SF",
              createdAt: new Date().toISOString()
            }
          ],
          savedStores: [
            {
              id: "1",
              name: "Vintage Treasures",
              location: "Brooklyn, NY",
              rating: 4.5,
              imageUrl: "/store-placeholder.jpg"
            },
            {
              id: "2",
              name: "Retro Finds",
              location: "Los Angeles, CA",
              rating: 4.7,
              imageUrl: "/store-placeholder2.jpg"
            },
            {
              id: "3",
              name: "Thrift Haven",
              location: "San Francisco, CA",
              rating: 4.8,
              imageUrl: "/store-placeholder3.jpg"
            }
          ]
        };
        setProfile(exampleProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-4">Error when loading profile</div>;
  }

  return (
    <main className="max-w-2xl mx-auto">
      {/* Profile Header Section */}
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={profile.avatar || '/default-avatar.png'}
              alt={profile.username}
              width={80}
              height={80}
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{profile.username}</h1>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        </div>
        
        <div className="flex justify-around mt-6 border-t border-b py-4">
          <div className="text-center">
            <div className="font-bold">{profile.stats.posts}</div>
            <div className="text-gray-600 text-sm">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profile.stats.followers}</div>
            <div className="text-gray-600 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profile.stats.following}</div>
            <div className="text-gray-600 text-sm">Following</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">My Thrift Finds</h2>
        <div className="grid grid-cols-3 gap-1">
          {profile.finds.map((find) => (
            <div key={find.id} className="aspect-square relative">
              <Image
                src={find.imageUrl}
                alt={find.title}
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Saved Stores</h2>
        <div className="flex overflow-x-auto gap-4">
          {profile.savedStores.map((store) => (
            <div key={store.id} className="flex-shrink-0 w-40">
              <div className="aspect-square relative mb-2">
                <Image
                  src={store.imageUrl}
                  alt={store.name}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.location}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
