'use client';
import { useState } from 'react';
import CreatePost from './create-post';
import PostList from './post-list';

export default function FindsPage() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Finds</h1>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {showCreateForm ? 'Cancel' : 'Create Post'}
                    </button>
                </div>

                {showCreateForm && <CreatePost />}
                <div className="mt-8">
                    <PostList />
                </div>
            </div>
        </div>
    );
}
