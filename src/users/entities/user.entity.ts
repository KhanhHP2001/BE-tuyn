import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    dayOfBirth: string;

    // @Prop({ default: {} })
    // roleId: object;

    @Prop()
    location: string;

    @Prop()
    dayStart: string;

    @Prop()
    insurance: string;

    // @Prop({ default: {} })
    // deparmentId: object;

    @Prop()
    attendanceData: string;

    // @Prop({ default: {} })
    // positionId: object;

    @Prop()
    status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);