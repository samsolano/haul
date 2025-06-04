import { User } from "@backend/src/models/user";
import { hashPassword } from "@backend/src/auth";
import * as userServices from "@backend/src/services/user";
import mongoose from 'mongoose';

// Mock the hashPassword function
jest.mock('@backend/src/auth', () => ({
  hashPassword: jest.fn()
}));

const mockedHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;

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

describe('User Schema Tests', () => {
  describe('Schema Validation', () => {
    test('should create user with valid data', async () => {
      const userData = {
        username: 'testuser',
        password: 'plainpassword'
      };

      mockedHashPassword.mockResolvedValue('hashedpassword123');

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.username).toBe('testuser');
      expect(savedUser.password).toBe('hashedpassword123');
      expect(savedUser.createdAt).toBeInstanceOf(Date);
      expect(savedUser._id).toBeDefined();
    });

    test('should require username field', async () => {
      const userData = {
        password: 'plainpassword'
        // missing username
      };

      const user = new User(userData);

      await expect(user.save()).rejects.toThrow();
      // Or more specific:
      // await expect(user.save()).rejects.toMatchObject({
      //   errors: expect.objectContaining({
      //     username: expect.any(Object)
      //   })
      // });
    });

    test('should require password field', async () => {
      const userData = {
        username: 'testuser'
        // missing password
      };

      const user = new User(userData);

      await expect(user.save()).rejects.toThrow();
    });

    test('should enforce unique username constraint', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123'
      };

      mockedHashPassword.mockResolvedValue('hashedpassword');

      // Create first user
      const user1 = new User(userData);
      await user1.save();

      // Try to create second user with same username
      const user2 = new User(userData);

      // The duplicate username should cause a MongoDB duplicate key error
      await expect(user2.save()).rejects.toThrow(/duplicate key|E11000/);
    });

    test('should set createdAt to current date by default', async () => {
      const beforeCreate = new Date();

      mockedHashPassword.mockResolvedValue('hashedpassword');

      const user = new User({
        username: 'testuser',
        password: 'password123'
      });

      const savedUser = await user.save();
      const afterCreate = new Date();

      expect(savedUser.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedUser.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('Password Hashing Pre-save Hook', () => {
    test('should hash password before saving new user', async () => {
      // Clear all existing users first
      await User.deleteMany({});
      
      // Clear mock call history from any previous operations
      mockedHashPassword.mockClear();
      
      const plainPassword = 'myplainpassword';
      const hashedPassword = 'hashed_myplainpassword';

      mockedHashPassword.mockResolvedValue(hashedPassword);

      const user = new User({
        username: 'testuser',
        password: plainPassword
      });

      await user.save();

      expect(mockedHashPassword).toHaveBeenCalledWith(plainPassword);
      expect(mockedHashPassword).toHaveBeenCalledTimes(1);
      expect(user.password).toBe(hashedPassword);
    });

    test('should hash password when password is modified', async () => {
      const originalPassword = 'originalpassword';
      const newPassword = 'newpassword';
      const hashedOriginal = 'hashed_original';
      const hashedNew = 'hashed_new';

      // Mock for initial save
      mockedHashPassword.mockResolvedValueOnce(hashedOriginal);

      const user = new User({
        username: 'testuser',
        password: originalPassword
      });

      await user.save();

      // Reset mock for update
      mockedHashPassword.mockClear();
      mockedHashPassword.mockResolvedValueOnce(hashedNew);

      // Modify password
      user.password = newPassword;
      await user.save();

      expect(mockedHashPassword).toHaveBeenCalledWith(newPassword);
      expect(user.password).toBe(hashedNew);
    });

    test('should NOT hash password when password is not modified', async () => {
      const plainPassword = 'myplainpassword';
      const hashedPassword = 'hashed_myplainpassword';

      mockedHashPassword.mockResolvedValue(hashedPassword);

      const user = new User({
        username: 'testuser',
        password: plainPassword
      });

      await user.save();

      // Clear mock calls from initial save
      mockedHashPassword.mockClear();

      // Modify non-password field
      user.username = 'newusername';
      await user.save();

      // hashPassword should NOT be called again
      expect(mockedHashPassword).not.toHaveBeenCalled();
      expect(user.password).toBe(hashedPassword); // Should still be the original hashed password
    });

    test('should handle hashing errors gracefully', async () => {
      const plainPassword = 'myplainpassword';
      const hashError = new Error('Hashing failed');

      mockedHashPassword.mockRejectedValue(hashError);

      const user = new User({
        username: 'testuser',
        password: plainPassword
      });

      await expect(user.save()).rejects.toThrow('Hashing failed');
    });
  });

  describe('Model Methods', () => {
    test('should create user instance with correct schema', () => {
      const userData = {
        username: 'testuser',
        password: 'password123'
      };

      const user = new User(userData);

      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe('testuser');
      expect(user.password).toBe('password123');
      expect(user.createdAt).toBeInstanceOf(Date);
    });
  });
});

describe("User Services Tests", () => {
  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    mockedHashPassword.mockResolvedValue('hashedpassword123');

    // Create test users
    const testUser = new User({
      username: 'testuser',
      password: 'password123'
    });
    await testUser.save();

    const secondUser = new User({
      username: 'seconduser',
      password: 'password456'
    });
    await secondUser.save();
  });

  describe('findAllUsers', () => {
    test('should return empty array when no users exist', async () => {
      // Clear all users
      await User.deleteMany({});

      const users = await userServices.findAllUsers();

      expect(users).toEqual([]);
      expect(Array.isArray(users)).toBe(true);
    });

    test('should return all users with string _id', async () => {
      const users = await userServices.findAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('username');
      expect(users[0]).toHaveProperty('password');
      expect(users[0]).toHaveProperty('createdAt');
      expect(users[0]).toHaveProperty('_id');
      expect(typeof users[0]._id).toBe('string');
      expect(typeof users[1]._id).toBe('string');

      // Check that we have both test users
      const usernames = users.map(u => u.username);
      expect(usernames).toContain('testuser');
      expect(usernames).toContain('seconduser');
    });

    test('should return users with hashed passwords', async () => {
      const users = await userServices.findAllUsers();

      expect(users[0].password).toBe('hashedpassword123');
      expect(users[1].password).toBe('hashedpassword123');
    });

    test('should return users ordered by creation', async () => {
      const users = await userServices.findAllUsers();

      expect(users[0].createdAt).toBeInstanceOf(Date);
      expect(users[1].createdAt).toBeInstanceOf(Date);
      // First user should be created before or at the same time as second user
      expect(users[0].createdAt.getTime()).toBeLessThanOrEqual(users[1].createdAt.getTime());
    });
  });

  describe('findUserByName', () => {
    test('should return null for non-existent username', async () => {
      const user = await userServices.findUserByName('nonexistentuser');

      expect(user).toBeNull();
    });

    test('should return user with string _id for valid username', async () => {
      const user = await userServices.findUserByName('testuser');

      expect(user).not.toBeNull();
      expect(user!.username).toBe('testuser');
      expect(user!.password).toBe('hashedpassword123');
      expect(user!.createdAt).toBeInstanceOf(Date);
      expect(user!._id).toBeDefined();
      expect(typeof user!._id).toBe('string');
    });

    test('should be case sensitive for username search', async () => {
      const user = await userServices.findUserByName('TestUser'); // Different case

      expect(user).toBeNull();
    });

    test('should return correct user when multiple users exist', async () => {
      const firstUser = await userServices.findUserByName('testuser');
      const secondUser = await userServices.findUserByName('seconduser');

      expect(firstUser).not.toBeNull();
      expect(secondUser).not.toBeNull();
      expect(firstUser!.username).toBe('testuser');
      expect(secondUser!.username).toBe('seconduser');
      expect(firstUser!._id).not.toBe(secondUser!._id);
    });

    test('should handle special characters in username', async () => {
      // Create user with special characters
      const specialUser = new User({
        username: 'user_with-special.chars',
        password: 'password'
      });
      await specialUser.save();

      const foundUser = await userServices.findUserByName('user_with-special.chars');

      expect(foundUser).not.toBeNull();
      expect(foundUser!.username).toBe('user_with-special.chars');
    });
  });

  describe('createUser', () => {
    test('should create user with valid data', async () => {
      // Clear existing users to avoid conflicts
      await User.deleteMany({});

      const username = 'newuser';
      const password = 'newpassword';

      const createdUser = await userServices.createUser(username, password);

      expect(createdUser.username).toBe(username);
      expect(createdUser.password).toBe('hashedpassword123'); // Mocked hash
      expect(createdUser.createdAt).toBeInstanceOf(Date);
      expect(createdUser._id).toBeDefined();
      expect(typeof createdUser._id).toBe('string');
    });

    test('should hash password before saving', async () => {
      await User.deleteMany({});
      mockedHashPassword.mockClear();
      mockedHashPassword.mockResolvedValue('newhashedpassword');

      const username = 'newuser';
      const password = 'plainpassword';

      const createdUser = await userServices.createUser(username, password);

      expect(mockedHashPassword).toHaveBeenCalledWith(password);
      expect(mockedHashPassword).toHaveBeenCalledTimes(1);
      expect(createdUser.password).toBe('newhashedpassword');
    });

    test('should fail to create user with duplicate username', async () => {
      const username = 'testuser'; // Already exists from beforeEach
      const password = 'anotherpassword';

      // The duplicate username should cause a MongoDB duplicate key error
      await expect(userServices.createUser(username, password)).rejects.toThrow(/duplicate key|E11000/);
    });

    test('should persist user to database', async () => {
      await User.deleteMany({});

      const username = 'persisteduser';
      const password = 'password';

      const createdUser = await userServices.createUser(username, password);

      // Verify user was actually saved to database
      const foundUser = await User.findById(createdUser._id);
      expect(foundUser).not.toBeNull();
      expect(foundUser!.username).toBe(username);
    });

    test('should set createdAt to current time', async () => {
      await User.deleteMany({});
      const beforeCreate = new Date();

      const createdUser = await userServices.createUser('timeuser', 'password');

      const afterCreate = new Date();
      expect(createdUser.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(createdUser.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    test('should fail with empty username', async () => {
      await expect(userServices.createUser('', 'password')).rejects.toThrow();
    });

    test('should fail with empty password', async () => {
      await User.deleteMany({});
      await expect(userServices.createUser('validuser', '')).rejects.toThrow();
    });

    test('should handle hashing errors gracefully', async () => {
      await User.deleteMany({});
      mockedHashPassword.mockRejectedValue(new Error('Hash error'));

      await expect(userServices.createUser('erroruser', 'password')).rejects.toThrow('Hash error');
    });
  });
});