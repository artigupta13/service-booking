import { Router } from "express";

const router = Router();

// GET / - Retrieves all services
router.get("/", async (req, res) => {
  try {
    const { serviceDataSource } = req.dataSources;
    // Get query parameters
    const { name, technician, page = 1, limit = 10 } = req.query;
    let filter = {};

    // Add filter conditions if query parameters are provided
    if (name) {
      filter.name = name;
    }
    if (technician) {
      filter.technician = technician;
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const services = await serviceDataSource.getAll(filter, skip, limit);

    res.json(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET /:id - Retrieves a specific service by ID
router.get("/:id", async (req, res) => {
  try {
    const { serviceDataSource } = req.dataSources;
    const service = await serviceDataSource.getById(req.params.id);
    res.json(service);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST / - Adds a new service
router.post("/", async (req, res) => {
  try {
    const { serviceDataSource } = req.dataSources;
    const newService = req.body;
    const result = await serviceDataSource.create(newService);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT /:id - Updates an existing service
router.put("/:id", async (req, res) => {
  try {
    const { serviceDataSource } = req.dataSources;
    const updatedservice = req.body;
    const result = await serviceDataSource.update(
      req.params.id,
      updatedservice
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE /:id - Deletes a service
router.delete("/:id", async (req, res) => {
  try {
    const { serviceDataSource } = req.dataSources;
    await serviceDataSource.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
