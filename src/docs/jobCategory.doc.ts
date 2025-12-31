/**
 * @swagger
 * tags:
 *   name: JobCategories
 *   description: Job category management
 */

/**
 * @swagger
 * /job-categories:
 *   post:
 *     summary: Create a job category
 *     tags: [JobCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - industry
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               description:
 *                 type: string
 *               parentId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Category created successfully
 */

/**
 * @swagger
 * /job-categories:
 *   get:
 *     summary: Get all job categories
 *     tags: [JobCategories]
 *     responses:
 *       200:
 *         description: List of job categories
 */

/**
 * @swagger
 * /job-categories/{id}:
 *   get:
 *     summary: Get a job category by ID
 *     tags: [JobCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Job category found
 *       404:
 *         description: Job category not found
 */
