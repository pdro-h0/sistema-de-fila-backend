import { env } from "./env"
import { app } from "./app"
import { setupSwagger } from "./config/swagger"

setupSwagger(app)
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})
