const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./User')

const app = express();

app.use(cors({
	origin: ['https://test-server-front.vercel.app/', 'http://localhost:5500']
}));
app.use(express.json())

mongoose.connect('mongodb+srv://maxi4okdev_db_user:maxi4okdev@users.vbsgbag.mongodb.net/')
	.then(() => { console.log('connected') })
	.catch(e => console.error(e))


app.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Cant access data" });
	}
})
app.post('/', async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		age: req.body.age
	});

	console.log('New user:', newUser.name);

	res.status(201).json(newUser);
});
app.delete('/', async (req,res) => {
	await User.deleteMany({});
	res.status(200).json('Deleted!');
})


app.listen(3000)
