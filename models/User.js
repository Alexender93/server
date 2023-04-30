import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
fullName: {
type: String,
required: true // Обязательно
},
email: {
type: String,
required: true,
unique: true
},
passwordHash: {
type: String,
required: true

},
awatartUrl: String,
}, {
timestamps: true

}



)
export default mongoose.model('User', UserSchema)