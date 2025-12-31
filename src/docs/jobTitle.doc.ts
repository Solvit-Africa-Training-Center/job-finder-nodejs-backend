/**
 * @swagger
 * tags:
 *   name: JobTitles
 *   description: Job title management
 */

/**
 * @swagger
 * /job-titles:
 *   post:
 *     summary: Create a job title
 *     tags: [JobTitles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - jobCategoryId
 *               - jobLevelId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               jobCategoryId:
 *                 type: string
 *                 format: uuid
 *               jobLevelId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Job title created
 */

/**
 * @swagger
 * /job-titles:
 *   get:
 *     summary: Get all job titles
 *     tags: [JobTitles]
 *     responses:
 *       200:
 *         description: List of job titles
 */
