import { ObjectId } from "mongodb";
class JobDataSource {
  constructor(collection) {
    this.collection = collection;
  }

  static async createIndexes(collection) {
    this.collection = collection;
    await this.collection.createIndex({ _id: 1 });
  }
  async getAll(filter, skip, limit) {
    const jobs = await this.collection.find(filter).skip(skip).limit(Number(limit)).toArray();
    return jobs;
  }

  async getAllByRole(email) {
    const jobs = await this.collection.find({ customerEmail: email }).toArray();
    return jobs;
  }

  async getById(id) {
    const job = await this.collection.findOne({ _id: new ObjectId(id) });
    return job;
  }

  async create(newJob) {
    const insertedId = await this.collection.insertOne(newJob);
    const job = await this.collection.findOne({ _id: insertedId });
    return job;
  }

  async update(id, data) {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    const job = await this.collection.findOne({ _id: new Object(id) });
    return job;
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default JobDataSource;
