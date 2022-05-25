import Sequelize, {DataTypes} from "sequelize";


export default class user extends Sequelize.Model {
	static init(dbConn) {
		super.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false
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
			tableName: 'users',
			hasTrigger: true,
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
			]
		});
		return user;
	}

	static associate ( models ) {
		this.hasMany(models.user_role, { foreignKey: 'user_id' });
	};
}
