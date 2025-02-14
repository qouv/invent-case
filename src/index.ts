import express, { json, urlencoded } from 'express'
import usersRouter from './routes/users'
import booksRouter from './routes/books'
import borrowedBooksRouter from './routes/borrowedBooks'

const port = process.env.PORT || 3000

const app = express()

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/', borrowedBooksRouter)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})

