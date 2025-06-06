'use client';
import { useRouter } from 'next/navigation';
import PostList from './post-list';

export default function FindsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => router.push('/finds/create-post')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Post
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <PostList />
                </div>
            </div>
        </div>
    );
}