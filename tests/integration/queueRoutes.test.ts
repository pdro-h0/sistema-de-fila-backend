import request from "supertest"
import { app } from "../../src/app"
import { db } from "../../src/lib/prisma"

describe("ENDPOINTS", () => {
  jest.setTimeout(65000)
  it("should register user", async () => {
    const input = {
      name: "João Silva",
      category: "Consulta",
      priority: "Normal",
      contact: "email@example.com",
    }
    const response = await request(app).post("/queue").send(input)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      position: 1,
    })
  })

  it("should be able to check position", async () => {
    const clientCreated = await request(app).post("/queue").send({
      name: "João Silva",
      category: "Consulta",
      priority: "Normal",
      contact: "email@example.com",
    })
    const response = await request(app).get(
      `/queue/${clientCreated.body.id}/position`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("estimedTime")
    expect(response.body).toMatchObject({
      position: 1,
    })
  })

  it("should be able to cancel service", async () => {
    const clientCreated = await request(app).post("/queue").send({
      name: "João Silva",
      category: "Consulta",
      priority: "Normal",
      contact: "email@example.com",
    })
    const response = await request(app).delete(
      `/queue/${clientCreated.body.id}`
    )
    expect(response.status).toBe(204)
    const client = await db.client.findUnique({
      where: {
        id: clientCreated.body.id,
      },
    })
    expect(client?.status).toBe("Canceled")
  })

  it("should be able to list all clients in queue", async () => {
    await request(app).post("/queue").send({
      name: "João Silva",
      category: "Consulta",
      priority: "Normal",
      contact: "email@example.com",
    })
    const response = await request(app).get(`/queue?queueCategory=Consulta`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0]).toHaveProperty("name")
    expect(response.body[0]).toHaveProperty("position")
    expect(response.body[0]).toHaveProperty("priority")
  })
})
