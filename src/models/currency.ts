import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'

export class Currency extends Model<
  InferAttributes<Currency>,
  InferCreationAttributes<Currency>
> {
  declare id: CreationOptional<number>
  declare description: string
	declare symbol: string
	declare active: boolean
}

export const initCurrency = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Currency.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			description: {
				type: new DataTypes.STRING(250),
				allowNull: false
			},
			symbol: {
				type: new DataTypes.STRING(3),
				allowNull: false
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'currency',
			timestamps: false
		}
	)
}
