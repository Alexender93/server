import express from 'express'
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from './validations.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import cors from 'cors'
import multer from 'multer'
const app = express()
const storage = multer.diskStorage({
destination: (_,__, cb) => { //null значит нет ошибок
cb(null, 'uploads') //Во время создания хранилища для картинок создай функцию destination
},
fileName: (_,file, cb) => { 
    cb(null, file.originalname) // При отправке запроса вытащиться оригинальное название файла
    }
})
const upload = multer({storage})


app.use(express.json())

app.use(cors())
mongoose
.connect('mongodb+srv://bezkrovi93:1a2b3c4d5e@cluster0.eebr6h4.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error')); 
app.use('/uploads', express.static('uploads')) //Ждём запрос и ищет в этой папке файл
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.filename}` //при запросе будет вітаскиваться оригинальное имя 
    })
}) //при запросе будем ожидать файл image
app.get('/posts', PostController.getAll) // Хочу получить все статьи
app.get('/posts/:id', PostController.getOne) // Хочу одну статью
app.post('/posts', checkAuth, postCreateValidation, PostController.create) // Хочу создать статью
app.delete('/posts/:id', checkAuth, PostController.remove) // Хочу удалить статью
app.patch('/posts/:id', PostController.update) // Хочу обновить статью
app.get('/posts/tags', PostController.getLastTags)
app.get('/tags', PostController.getLastTags)


app.listen(4444, (err) => {
if (err) {
return console.log(err);

}
console.log('Server Ok')

})