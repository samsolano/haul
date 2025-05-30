'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

interface Comment {
    author: {
        username: string;
    };
    content: string;
    createdAt: string;
}

interface Post {
    _id: string;
    author: {
        username: string;
    };
    mainImageUrl: string;
    description: string;
    comments: Comment[];
    createdAt: string;
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/posts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load posts");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                <p className="font-medium">Error loading posts</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No posts yet. Be the first to share a find!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-64 w-full">
                        <Image
                            src={post.mainImageUrl}
                            alt={post.description}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                                Posted by {post.author.username}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="text-gray-800 mb-4">{post.description}</p>
                        
                        {/* Comments Section */}
                        <div className="mt-4 border-t pt-4">
                            <h3 className="text-lg font-semibold mb-2">Comments</h3>
                            {post.comments.length > 0 ? (
                                <div className="space-y-2">
                                    {post.comments.map((comment, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded">
                                            <p className="text-sm font-medium text-gray-700">
                                                {comment.author.username}
                                            </p>
                                            <p className="text-gray-600">{comment.content}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No comments yet</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 