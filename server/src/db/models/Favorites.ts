import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
    indexes: [{ fields: ['userId', 'mediId'], unique: true }],
})
export class Favorites extends Model {
    @ForeignKey(() => User)
    @Column
    declare userId: string;

    @Column
    declare mediId: string;

    @BelongsTo(() => User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        hooks: true,
    })
    declare user: User;
}
