const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded())

const alpacas = [
  {
    id: 1,
    name: "Steve"
  },
  {
    id: 2,
    name: "Tina"
  },
  {
    id: 3,
    name: "Rick"
  },
  {
    id: 4,
    name: "Nimit"
  }
]

app.get("/", (req, res, next) => {
  res.send(alpacas)
})

app.get("/:id", (req, res, next) => {
  const id = Number(req.params.id)
  const foundAlpaca = alpacas.find(alpaca => alpaca.id === id)
  if (!foundAlpaca) return res.sendStatus(404)
  res.send(foundAlpaca)
})

app.post("/", (req, res, next) => {
  const { name } = req.body
  const id = alpacas.length + 1
  alpacas.push({ name, id })
  res.sendStatus(201)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
