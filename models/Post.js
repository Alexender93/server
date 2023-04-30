import mongoose from 'mongoose'
const PostSchema = new mongoose.Schema({
title: {
type: String,
required: true // Обязательно
},
text: {
type: String,
required: true,
unique: true
},
tags: {
type: Array,
default: []  // Если не передаёться то пустой массив
},
viewsCount: {
type: Number,
default: 0

},
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true

},
imageUrl: {
type: String

},
}, {
timestamps: true

}



)
export default mongoose.model('Post', PostSchema)