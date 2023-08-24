// models/User.tsx
import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/database';
class User extends Model {
  public id!: number; // Asumiendo que hay una columna de ID autoincremental
  public username!: string;
  public password!: string;
  public email!: string;
  // Puedes agregar otros campos aquí según tus necesidades
}


User.init(
  {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Puedes agregar otros campos aquí según tus necesidades
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

