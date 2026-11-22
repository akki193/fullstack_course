// console.log('started', new Date().toISOString())

const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id": "67",
      "name": "pal laich",
      "number": "1337"
    }
]

const generateId = () => {
  const id = Math.floor(Math.random()*1_000_000)

  console.log(`Generated id: ${id}`)

  return String(id)
  
}

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info of ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (persons) {
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(`name: ${body.name}, number: ${body.number}`)
  
  if (!persons.map(p => p.name).includes(body.name) && body.name && body.number) { 
    const person = {
      "id": generateId(),
      "name": body.name,
      "number": body.number
    }

    persons = persons.concat(person)
    response.json(person)
  } else {
    response.status(400).json(
      {"error": "the content is missing"}
    )
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
  
})