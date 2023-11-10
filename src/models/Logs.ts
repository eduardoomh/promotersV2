import mongoose, { Model, Document } from 'mongoose'

export interface ILogsSchema extends Document {
    _id: string;
    data: any;
}

const LogsSchema = new mongoose.Schema({
    data: {
       type: String,
       required: true
    }
})

const LogsModel: Model<ILogsSchema> = mongoose.models.Logs || mongoose.model('Logs', LogsSchema)
export default LogsModel