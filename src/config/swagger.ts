import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import { env } from "../env"

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Fila",
      version: "1.0.0",
      description: "API para gerenciar filas de espera.",
    },
    servers: [
      {
        url: "https://sistema-de-fila-backend.onrender.com",
      },
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ["./src/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options)

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
