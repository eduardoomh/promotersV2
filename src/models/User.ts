import mongoose, { Schema, Document, ObjectId, Model } from 'mongoose'

export interface IUserSchema extends Document {
    _id: string;
    name: string;
    email: string;
    password: string
    role: 'promoter' | 'admin';
    created_at: number;
    updated_at: number;
}


const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: ['promoter', 'admin'],
            message: '{VALUE} no es un rol permitido'
        },
        default: 'promoter'
    },
    created_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
    updated_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
})

const UserModel: Model<IUserSchema> = mongoose.models.User || mongoose.model('User', userSchema)
export default UserModel