'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserProfile } from "@/types";
import { useCredentials } from "@/hooks/useCredentials";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const { userId, jwt } = useCredentials();
  const { user, loading } = useUserInfo(userId);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const profile: UserProfile = {
      username: user.username,
      finds: [],
      stats: { followers: 0, following: 0, posts: 0 },
      savedStores: [],
    }

    setProfile(profile);
  }, [user]);

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
