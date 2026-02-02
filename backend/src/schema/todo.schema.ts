import {Schema, Document, model} from 'mongoose'

export interface ToDoInterface extends Document{
    title:String;


}

const ToDoSchema = new  Schema({title:String})
export const TodoModel = model("task",ToDoSchema)