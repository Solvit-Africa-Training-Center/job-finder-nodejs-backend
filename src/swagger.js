import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Finder Admin API",
      version: "1.0.0",
      description: "Admin CMS & configuration APIs (mocked auth)",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["src/routes/*.ts"],
});
export default swaggerSpec;
