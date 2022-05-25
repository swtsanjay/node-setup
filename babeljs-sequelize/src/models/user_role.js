import Sequelize, { DataTypes } from 'sequelize';


export default class user_role extends Sequelize.Model {
	static init(dbConn) {
		super.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'roles',
					key: 'id'
				}
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
			}
		}, {
			sequelize: dbConn,
			tableName: 'user_roles',
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [
						{ name: "id" },
					]
				},
				{
					name: "role_id",
					using: "BTREE",
					fields: [
						{ name: "role_id" },
					]
				},
				{
					name: "user_id",
					using: "BTREE",
					fields: [
						{ name: "user_id" },
					]
				},
			]
		});
		return user_role;
	}

	static associate ( models ) {
		this.belongsTo(models.user, { foreignKey: 'user_id' });
	};
}
