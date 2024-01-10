

// Saving new Notes
// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })
    
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


// Fetching the Notes
Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
