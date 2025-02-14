import express, { json, urlencoded } from 'express'
import usersRouter from './routes/users'

const port = 3000

const app = express()

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/users', usersRouter)

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000')
})

