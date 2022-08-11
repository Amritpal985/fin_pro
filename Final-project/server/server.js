const app = require('express')();
const Contact = require('./models/contact');
const mongoose = require('mongoose');
// middlewares

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});


app.post('/contact', async (req, res) => {
    try {
        const contact = req.body;
        await Contact.create(contact);
        res.json({ "status": 201, "message": "Contact created successfully" });
    } catch (error) {
        res.status(500).json({ "status": 500, "message": "Something went wrong" });
    }
})

app.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ "status": 500, "message": "Something went wrong" });
    }
}
);
// middlewares

mongoose.connect('mongodb://localhost:27017/contact', () => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    })});
