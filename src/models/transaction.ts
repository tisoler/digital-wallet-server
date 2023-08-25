import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'

export class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<number>
  declare idWallet: number
  declare amount: number
	declare action: string
	declare datetime: Date
}

export const initTransaction = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Transaction.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			idWallet: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false
			},
			amount: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
			action: {
				type: new DataTypes.STRING(45),
				allowNull: false
			},
			datetime: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'transaction',
			timestamps: false
		}
	)
}
