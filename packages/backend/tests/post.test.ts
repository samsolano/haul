import { Post } from "@backend/src/models/post";
import { User } from "@backend/src/models/user";
import mongoose from 'mongoose';
import { findAllPosts, findPostById, findPostsByAuthor, createPost } from "@backend/src/services/post";
import { PostUnresolved } from "@common/types/post";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI!);
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Post Schema Tests', () => {
  let testUserId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    // Create a test user to use as author
    const testUser = new User({
      username: 'testuser',
      password: 'password123'
    });
    const savedUser = await testUser.save();
    testUserId = savedUser._id;
  });

  describe('Schema Validation', () => {
    test('should create post with valid data', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'This is a test post description',
        comments: []
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      expect(savedPost.author).toEqual(testUserId);
      expect(savedPost.mainImageUrl).toBe('https://example.com/image.jpg');
      expect(savedPost.description).toBe('This is a test post description');
      expect(savedPost.comments).toEqual([]);
      expect(savedPost.createdAt).toBeInstanceOf(Date);
      expect(savedPost._id).toBeDefined();
    });

    test('should require author field', async () => {
      const postData = {
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'This is a test post description'
        // missing author
      };

      const post = new Post(postData);

      await expect(post.save()).rejects.toThrow();
    });

    test('should require mainImageUrl field', async () => {
      const postData = {
        author: testUserId,
        description: 'This is a test post description'
        // missing mainImageUrl
      };

      const post = new Post(postData);

      await expect(post.save()).rejects.toThrow();
    });

    test('should require description field', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg'
        // missing description
      };

      const post = new Post(postData);

      await expect(post.save()).rejects.toThrow();
    });

    test('should set createdAt to current date by default', async () => {
      const beforeCreate = new Date();

      const post = new Post({
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      });

      const savedPost = await post.save();
      const afterCreate = new Date();

      expect(savedPost.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedPost.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    test('should set comments to empty array by default', async () => {
      const post = new Post({
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      });

      const savedPost = await post.save();

      expect(savedPost.comments).toEqual([]);
      expect(Array.isArray(savedPost.comments)).toBe(true);
    });
  });

  describe('Comment Schema Validation', () => {
    test('should create post with valid comments', async () => {
      const commentData = {
        author: testUserId,
        content: 'This is a test comment',
        createdAt: new Date()
      };

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments: [commentData]
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      expect(savedPost.comments).toHaveLength(1);
      expect(savedPost.comments[0].author).toEqual(testUserId);
      expect(savedPost.comments[0].content).toBe('This is a test comment');
      expect(savedPost.comments[0].createdAt).toBeInstanceOf(Date);
    });

    test('should require comment author field', async () => {
      const invalidCommentData = {
        content: 'This is a test comment'
        // missing author
      };

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments: [invalidCommentData]
      };

      const post = new Post(postData);

      await expect(post.save()).rejects.toThrow();
    });

    test('should require comment content field', async () => {
      const invalidCommentData = {
        author: testUserId
        // missing content
      };

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments: [invalidCommentData]
      };

      const post = new Post(postData);

      await expect(post.save()).rejects.toThrow();
    });

    test('should set comment createdAt to current date by default', async () => {
      const beforeCreate = new Date();

      const commentData = {
        author: testUserId,
        content: 'This is a test comment'
        // createdAt should default
      };

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments: [commentData]
      };

      const post = new Post(postData);
      const savedPost = await post.save();
      const afterCreate = new Date();

      expect(savedPost.comments[0].createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedPost.comments[0].createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    test('should allow multiple comments', async () => {
      // Create another test user for variety
      const secondUser = new User({
        username: 'seconduser',
        password: 'password123'
      });
      const secondUserId = (await secondUser.save())._id;

      const comments = [
        {
          author: testUserId,
          content: 'First comment'
        },
        {
          author: secondUserId,
          content: 'Second comment'
        },
        {
          author: testUserId,
          content: 'Third comment'
        }
      ];

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      expect(savedPost.comments).toHaveLength(3);
      expect(savedPost.comments[0].content).toBe('First comment');
      expect(savedPost.comments[1].content).toBe('Second comment');
      expect(savedPost.comments[2].content).toBe('Third comment');
    });
  });

  describe('Model Methods', () => {
    test('should create post instance with correct schema', () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      };

      const post = new Post(postData);

      expect(post).toBeInstanceOf(Post);
      expect(post.author).toEqual(testUserId);
      expect(post.mainImageUrl).toBe('https://example.com/image.jpg');
      expect(post.description).toBe('Test description');
      expect(post.createdAt).toBeInstanceOf(Date);
      expect(Array.isArray(post.comments)).toBe(true);
    });

    test('should handle ObjectId references correctly', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      expect(savedPost.author).toBeInstanceOf(mongoose.Types.ObjectId);
      expect(savedPost.author.toString()).toBe(testUserId.toString());
    });

    test('should populate author field correctly', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      const populatedPost = await Post.findById(savedPost._id).populate('author');

      expect(populatedPost?.author).toBeDefined();
      // @ts-expect-error - populated field changes type
      expect(populatedPost?.author.username).toBe('testuser');
    });

    test('should populate comment authors correctly', async () => {
      const commentData = {
        author: testUserId,
        content: 'Test comment'
      };

      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
        comments: [commentData]
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      const populatedPost = await Post.findById(savedPost._id)
        .populate('author')
        .populate('comments.author');

      expect(populatedPost?.comments[0].author).toBeDefined();
      // @ts-expect-error - populated field changes type
      expect(populatedPost?.comments[0].author.username).toBe('testuser');
    });
  });

  describe('Database Operations', () => {
    test('should update post successfully', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Original description'
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      savedPost.description = 'Updated description';
      savedPost.mainImageUrl = 'https://example.com/updated-image.jpg';
      const updatedPost = await savedPost.save();

      expect(updatedPost.description).toBe('Updated description');
      expect(updatedPost.mainImageUrl).toBe('https://example.com/updated-image.jpg');
      expect(updatedPost._id).toEqual(savedPost._id);
    });

    test('should delete post successfully', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description'
      };

      const post = new Post(postData);
      const savedPost = await post.save();
      const postId = savedPost._id;

      await Post.findByIdAndDelete(postId);
      const deletedPost = await Post.findById(postId);

      expect(deletedPost).toBeNull();
    });

    test('should find posts by author', async () => {
      // Create multiple posts
      const postsData = [
        {
          author: testUserId,
          mainImageUrl: 'https://example.com/image1.jpg',
          description: 'First post'
        },
        {
          author: testUserId,
          mainImageUrl: 'https://example.com/image2.jpg',
          description: 'Second post'
        }
      ];

      await Post.insertMany(postsData);
      const foundPosts = await Post.find({ author: testUserId });

      expect(foundPosts).toHaveLength(2);
      expect(foundPosts[0].author).toEqual(testUserId);
      expect(foundPosts[1].author).toEqual(testUserId);
    });
  });
});

describe("Post Services Tests", () => {
  let testUserId: mongoose.Types.ObjectId;
  let secondUserId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    // Create test users
    const testUser = new User({
      username: 'testuser',
      password: 'password123'
    });
    const savedUser = await testUser.save();
    testUserId = savedUser._id;

    const secondUser = new User({
      username: 'seconduser',
      password: 'password456'
    });
    const savedSecondUser = await secondUser.save();
    secondUserId = savedSecondUser._id;
  });

  describe('findAllPosts', () => {
    test('should return empty array when no posts exist', async () => {
      const posts = await findAllPosts();
      expect(posts).toEqual([]);
      expect(Array.isArray(posts)).toBe(true);
    });

    test('should return all posts with populated author and comments', async () => {
      // Create test posts
      const postsData = [
        {
          author: testUserId,
          mainImageUrl: 'https://example.com/image1.jpg',
          description: 'First post',
          comments: [{
            author: secondUserId,
            content: 'Great post!'
          }]
        },
        {
          author: secondUserId,
          mainImageUrl: 'https://example.com/image2.jpg',
          description: 'Second post',
          comments: []
        }
      ];

      await Post.insertMany(postsData);
      const posts = await findAllPosts();

      expect(posts).toHaveLength(2);

      // Check that authors are populated
      expect(posts[0].author).toHaveProperty('username');
      expect(posts[1].author).toHaveProperty('username');

      // Check that comment authors are populated
      expect(posts[0].comments[0].author).toHaveProperty('username');
    });

    test('should handle posts with multiple comments', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Post with multiple comments',
        comments: [
          {
            author: testUserId,
            content: 'First comment'
          },
          {
            author: secondUserId,
            content: 'Second comment'
          }
        ]
      };

      await Post.create(postData);
      const posts = await findAllPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].comments).toHaveLength(2);
      expect(posts[0].comments[0].author).toHaveProperty('username');
      expect(posts[0].comments[1].author).toHaveProperty('username');
    });
  });

  describe('findPostById', () => {
    test('should return null for non-existent post ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const post = await findPostById(nonExistentId);
      expect(post).toBeNull();
    });

    test('should return post with populated author and comments for valid ID', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test post',
        comments: [{
          author: secondUserId,
          content: 'Nice post!'
        }]
      };

      const createdPost = await Post.create(postData);
      const foundPost = await findPostById(createdPost._id.toString());

      expect(foundPost).not.toBeNull();
      expect(foundPost!._id.toString()).toBe(createdPost._id.toString());
      expect(foundPost!.author).toHaveProperty('username');
      expect(foundPost!.comments[0].author).toHaveProperty('username');
    });

    test('should handle invalid ObjectId format', async () => {
      const invalidId = 'invalid-id';
      await expect(findPostById(invalidId)).rejects.toThrow();
    });

    test('should return post with empty comments array', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Post without comments'
      };

      const createdPost = await Post.create(postData);
      const foundPost = await findPostById(createdPost._id.toString());

      expect(foundPost).not.toBeNull();
      expect(foundPost!.comments).toEqual([]);
    });
  });

  describe('findPostsByAuthor', () => {
    test('should return empty array for author with no posts', async () => {
      const posts = await findPostsByAuthor(testUserId);
      expect(posts).toEqual([]);
      expect(Array.isArray(posts)).toBe(true);
    });

    test('should return all posts by specific author with populated data', async () => {
      const postsData = [
        {
          author: testUserId,
          mainImageUrl: 'https://example.com/image1.jpg',
          description: 'First post by testuser',
          comments: [{
            author: secondUserId,
            content: 'Comment on first post'
          }]
        },
        {
          author: testUserId,
          mainImageUrl: 'https://example.com/image2.jpg',
          description: 'Second post by testuser'
        },
        {
          author: secondUserId,
          mainImageUrl: 'https://example.com/image3.jpg',
          description: 'Post by different user'
        }
      ];

      await Post.insertMany(postsData);
      const posts = await findPostsByAuthor(testUserId);

      expect(posts).toHaveLength(2);

      // Verify all posts belong to the correct author
      posts!.forEach(post => {
        // @ts-expect-error - populated field changes type
        expect(post.author._id?.toString()).toBe(testUserId.toString());
        expect(post.author).toHaveProperty('username');
      });

      // Check populated comment authors
      expect(posts![0].comments[0].author).toHaveProperty('username');
    });

    test('should not return posts from other authors', async () => {
      const postsData = [
        {
          author: secondUserId,
          mainImageUrl: 'https://example.com/image1.jpg',
          description: 'Post by second user'
        },
        {
          author: secondUserId,
          mainImageUrl: 'https://example.com/image2.jpg',
          description: 'Another post by second user'
        }
      ];

      await Post.insertMany(postsData);
      const posts = await findPostsByAuthor(testUserId);

      expect(posts).toEqual([]);
    });

    test('should handle author with posts containing multiple comments', async () => {
      const postData = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Post with multiple comments',
        comments: [
          {
            author: testUserId,
            content: 'Self comment'
          },
          {
            author: secondUserId,
            content: 'Comment from another user'
          }
        ]
      };

      await Post.create(postData);
      const posts = await findPostsByAuthor(testUserId);

      expect(posts).toHaveLength(1);
      expect(posts![0].comments).toHaveLength(2);
      expect(posts![0].comments[0].author).toHaveProperty('username');
      expect(posts![0].comments[1].author).toHaveProperty('username');
    });
  });

  describe('createPost', () => {
    test('should create post with valid data', async () => {
      const postData: PostUnresolved = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test post description'
      };

      const createdPost = await createPost(postData);

      expect(createdPost).toBeDefined();
      expect(createdPost._id).toBeDefined();
      expect(createdPost.author.toString()).toBe(testUserId.toString());
      expect(createdPost.mainImageUrl).toBe('https://example.com/image.jpg');
      expect(createdPost.description).toBe('Test post description');
      expect(createdPost.createdAt).toBeInstanceOf(Date);
      expect(createdPost.comments).toEqual([]);
    });

    test('should create post with comments', async () => {
      const postData: PostUnresolved = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Post with initial comments',
        comments: [
          {
            author: secondUserId,
            content: 'First comment',
            createdAt: new Date()
          },
          {
            author: testUserId,
            content: 'Second comment',
            createdAt: new Date()
          }
        ]
      };

      const createdPost = await createPost(postData);

      expect(createdPost).toBeDefined();
      expect(createdPost._id).toBeDefined();
      expect(createdPost.comments).toHaveLength(2);
      expect(createdPost.comments[0].content).toBe('First comment');
      expect(createdPost.comments[1].content).toBe('Second comment');
      expect(createdPost.comments[0].author.toString()).toBe(secondUserId.toString());
      expect(createdPost.comments[1].author.toString()).toBe(testUserId.toString());
    });

    test('should fail to create post with missing required fields', async () => {
      const invalidPostData = {
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Missing author field'
        // missing author
      };

      // @ts-expect-error - the data is intentionally invalid
      await expect(createPost(invalidPostData)).rejects.toThrow();
    });

    test('should fail to create post with invalid author ObjectId', async () => {
      const invalidPostData = {
        author: 'invalid-object-id',
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Invalid author ID'
      };

      // @ts-expect-error - the data is intentionally invalid
      await expect(createPost(invalidPostData)).rejects.toThrow();
    });

    test('should set default values correctly', async () => {
      const postData: PostUnresolved = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Test description',
      };

      const createdPost = await createPost(postData);

      expect(createdPost.comments).toEqual([]);
      expect(createdPost.createdAt).toBeInstanceOf(Date);

      // Check that createdAt is recent (within last 5 seconds)
      const now = new Date();
      const timeDiff = now.getTime() - createdPost.createdAt.getTime();
      expect(timeDiff).toBeLessThan(5000);
    });

    test('should persist post to database', async () => {
      const postData: PostUnresolved = {
        author: testUserId,
        mainImageUrl: 'https://example.com/image.jpg',
        description: 'Persistence test',
        createdAt: new Date(),
        comments: []
      };

      const createdPost = await createPost(postData);

      // Verify post exists in database
      const foundPost = await Post.findById(createdPost._id);
      expect(foundPost).not.toBeNull();
      expect(foundPost!.description).toBe('Persistence test');
      expect(foundPost!.author.toString()).toBe(testUserId.toString());
    });
  });
});