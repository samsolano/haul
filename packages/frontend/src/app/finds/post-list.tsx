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
    const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [newComments, setNewComments] = useState<{ [postId: string]: string }>({});
    const [addingCommentPostId, setAddingCommentPostId] = useState<string | null>(null);

    useEffect(() => {
        // Get current user from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setCurrentUser(user);
            } catch (err) {
                console.error('Error parsing user from localStorage:', err);
            }
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
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

    const handleDeletePost = async (postId: string) => {
        setDeletingPostId(postId);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Please log in to delete posts');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to delete post');
            }

            // Remove the deleted post from the local state
            setPosts(posts.filter(post => post._id !== postId));
            setShowDeleteConfirm(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete post');
        } finally {
            setDeletingPostId(null);
        }
    };

    const handleDeleteClick = (postId: string) => {
        setShowDeleteConfirm(postId);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(null);
    };

    const handleAddComment = async (postId: string) => {
        const commentContent = newComments[postId]?.trim();
        if (!commentContent) return;

        setAddingCommentPostId(postId);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Please log in to add comments');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: commentContent })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to add comment');
            }

            const updatedPost = await response.json();
            
            // Update the post in our local state
            setPosts(posts.map(post => 
                post._id === postId ? updatedPost : post
            ));
            
            // Clear the comment input
            setNewComments(prev => ({ ...prev, [postId]: '' }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add comment');
        } finally {
            setAddingCommentPostId(null);
        }
    };

    const handleCommentChange = (postId: string, value: string) => {
        setNewComments(prev => ({ ...prev, [postId]: value }));
    };

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
            <div className="text-center p-8 rounded-lg">
                <p className="text-gray-600">No posts yet. Be the first to share a find!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {posts.map((post) => (
                <div key={post._id} className="w-full max-w-lg md:p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2 text-center">
                            <p className="text-xl font-medium">
                                {post.author.username}
                            </p>
                            <div className="flex items-center gap-3">
                                <p className="text-s font-medium">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                                {/* Show delete button only for posts by current user */}
                                {currentUser && currentUser.username === post.author.username && (
                                    <button
                                        onClick={() => handleDeleteClick(post._id)}
                                        className="text-red-500 hover:text-red-700 text-s font-medium"
                                        disabled={deletingPostId === post._id}
                                    >
                                        {deletingPostId === post._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                )}
                            </div>
                        </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        {post.mainImageUrl.startsWith('data:') ? (
                            // Use regular img tag for data URLs since Next.js Image doesn't support them
                            <img
                                src={post.mainImageUrl}
                                alt={post.description}
                                className="h-full rounded-lg max-w-full"
                            />
                        ) : (
                            // Use Next.js Image for external URLs
                            <Image
                                src={post.mainImageUrl}
                                alt={post.description}
                                fill
                                className="h-full rounded-lg max-w-full"
                            />
                        )}
                    </div>
                    <div className="p-4">
                        <p className="mb-4">{post.description}</p>
                        
                        {/* Comments Section */}
                        <div className="mt-4 border-t pt-4">
                            <h3 className="text-lg font-semibold mb-2">Comments</h3>
                            {post.comments.length > 0 ? (
                                <div className="space-y-2">
                                    {post.comments.map((comment, index) => (
                                        <div key={index} className=" p-3 rounded">
                                            <p className="text-sm font-medium">
                                                {comment.author.username}
                                            </p>
                                            <p>{comment.content}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No comments yet</p>
                            )}
                            
                            {/* Add Comment Form */}
                            {currentUser && (
                                <div className="mt-4 space-y-2">
                                    <textarea
                                        value={newComments[post._id] || ''}
                                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full  p-2 rounded resize-none text-left"
                                        rows={2}
                                        disabled={addingCommentPostId === post._id}
                                    />
                                    <button
                                        onClick={() => handleAddComment(post._id)}
                                        disabled={!newComments[post._id]?.trim() || addingCommentPostId === post._id}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {addingCommentPostId === post._id ? 'Adding...' : 'Add Comment'}
                                    </button>
                                </div>
                            )}
                            {!currentUser && (
                                <p className="text-gray-500 text-sm mt-4">Please log in to add comments</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h3 className="text-lg text-black font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-black mb-6">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 px-4 py-2  text-black border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeletePost(showDeleteConfirm)}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={deletingPostId === showDeleteConfirm}
                            >
                                {deletingPostId === showDeleteConfirm ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}