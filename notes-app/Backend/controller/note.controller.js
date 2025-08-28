const Note = require("../models/notes.model")

exports.createNote = async (req,res)=>{
    try {
          const { title, content } = req.body
          const note = await Note.create({title,content})
          res.status(201).json(note)
    } catch (err) {
        res.status(500).json({error:err.messa})
        console.log(err)
    }
}

exports.getNotes = async(req,res)=>{
    try {
        const notes = await await Note.find()
        res.json(notes)
    } catch (error) {
          res.status(500).json({ error: err.message })
    }
}
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(note)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.json({ message: "Note deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
