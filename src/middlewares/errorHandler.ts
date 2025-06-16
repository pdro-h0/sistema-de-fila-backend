import { NextFunction, Response, Request } from "express"
import { ZodError } from "zod"

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

export const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({ error: err.message })
    return
  }

  res.status(500).json({ error: "Internal server error" })
  console.error(err)
  return
}
