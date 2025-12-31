/**
 * @swagger
 * tags:
 *   name: JobLevels
 *   description: Job level management
 */

/**
 * @swagger
 * /job-levels:
 *   post:
 *     summary: Create a job level
 *     tags: [JobLevels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job level created
 */

/**
 * @swagger
 * /job-levels:
 *   get:
 *     summary: Get all job levels
 *     tags: [JobLevels]
 *     responses:
 *       200:
 *         description: List of job levels
 */
