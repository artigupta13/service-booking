import initialServices from "../data/initialServices.js";
import { ObjectId } from "mongodb";
import { capitalizeWords } from "../utils/stringUtils.js";

class ServiceDataSource {
  constructor(collection) {
    this.collection = collection;
  }

  static async createIndexes(collection) {
    this.collection = collection;
    await this.collection.createIndex({ name: 1, technician: 1 });
  }

  async initializeService() {
    const existingServices = await this.collection.find().toArray();
    if (existingServices.length === 0) {
      await this.collection.insertMany(initialServices);
      console.log("Initial services added.");
    } else {
      console.log("Services already exist.");
    }
  }

  async getAll(filter, skip, limit) {
    const services = await this.collection
      .find(filter)
      .skip(skip)
      .limit(Number(limit))
      .toArray();
    return services;
  }

  async getById(id) {
    const service = await this.collection.findOne({ _id: new ObjectId(id) });
    return service;
  }

  async create(newService) {
    let { name, description, price, duration, technician } = newService;
    name = capitalizeWords(name);
    technician = capitalizeWords(technician);
    duration = capitalizeWords(duration);
    price = parseFloat(price);

    if (
      name === "" ||
      description === "" ||
      technician === "" ||
      duration === "" ||
      price === NaN
    ) {
      throw new Error("Invalid data");
    }

    const result = await this.collection.updateOne(
      { name, technician },
      {
        $set: {
          name,
          description,
          price,
          duration,
          technician,
        },
      },
      {
        upsert: true,
      }
    );
    return result;
  }

  async update(data) {
    await this.collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: data }
    );
    const service = await this.collection.findOne({ _id: new Object(id) });
    return service;
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default ServiceDataSource;
