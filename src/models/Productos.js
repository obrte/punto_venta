module.exports = (sequelize, DataTypes) => {
	const productos = sequelize.define(
		'productos', {
			codigo: {
				type: DataTypes.STRING(13),
				unique: true,
				primaryKey: true
			},
			nombre: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			descripcion: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true
			},
			precio: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			// Timestamps
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE
		}, {
			paranoid: false,
			underscored: true
		}
	)
	return productos
}