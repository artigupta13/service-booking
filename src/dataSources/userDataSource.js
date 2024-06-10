import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const SALT_ROUNDS = 10;
class UserDataSource {
  constructor(collection) {
    this.collection = collection;
  }

  static async createIndexes(collection) {
    this.collection = collection;
    await this.collection.createIndex({ email: 1 });
  }

  async getUserByEmail(email) {
    return this.collection.findOne({ email });
  }

  async createUser(data) {
    const { username, email, password, role } = data;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await this.collection.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return result.insertedId;
  }
}

export default UserDataSource;
