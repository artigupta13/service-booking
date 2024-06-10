import { Router } from "express";

const router = Router();

// GET / - Retrieves all jobs
router.get("/", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    // Get query parameters
    const {
      serviceId,
      customerEmail,
      status,
      technician,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};

    // Add filter conditions if query parameters are provided
    if (serviceId) {
      filter.serviceId = serviceId;
    }
    if (status) {
      filter.status = status;
    }
    if (customerEmail) {
      filter.customerEmail = customerEmail;
    }
    if (technician) {
      filter.technician = technician;
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const jobs = await jobDataSource.getAll(filter, skip, limit);
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/customer-jobs", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    const { email } = req.user;
    const jobs = await jobDataSource.getAllByCustomerEmail(email);
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET /:id - Retrieves a specific job by ID
router.get("/:id", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    const job = await jobDataSource.getById(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST / - Adds a new job
router.post("/", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    const newjob = req.body;
    const result = await jobDataSource.create(newjob);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT /:id - Updates an existing job
router.put("/:id", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    const updatedjob = req.body;
    const result = await jobDataSource.update(req.params.id, updatedjob);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE /:id - Deletes a job
router.delete("/:id", async (req, res) => {
  try {
    const { jobDataSource } = req.dataSources;
    await jobDataSource.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
