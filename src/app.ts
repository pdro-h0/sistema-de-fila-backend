import express from "express"
import { router } from "./route"
import { errorhandler } from "./middlewares/errorHandler"

export const app = express()

app.use(express.json())
app.use(router)
app.use(errorhandler)
