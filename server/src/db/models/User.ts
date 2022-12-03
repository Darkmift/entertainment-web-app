import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class User extends Model {
    @Unique
    @Column
    declare email: string;

    @Column
    declare password: string;
}
