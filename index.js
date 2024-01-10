const express = require('express')
const app = express()
const cors = require('cors')

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end('Note does not exist')
    }
    response.json(note)
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({
            error: "content is missing"
        })
    }
    
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)
    
    response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.map(note => note.id === id ? request.body : note)
    const note = notes.find(note => note.id === id)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes =  notes.filter(note => note.id !== id)
    
    response.status(204).end()
})

app.use(unknownEndpoint)

// We then bind the server to a particular port, for the app to listen to HTTP requests.
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// // Node's built-in web server module
// const http = require('http')


// // Creates a server and an event handler is registered with it so that it responds
// // every time a HTTP request is made to server's address
// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

