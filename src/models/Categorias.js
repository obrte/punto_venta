module.exports = (sequelize, DataTypes) => {
	const categoria = sequelize.define('categoria', {
		idCategoria: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	return categoria
}