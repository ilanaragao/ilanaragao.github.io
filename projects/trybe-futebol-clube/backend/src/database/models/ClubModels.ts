import { DataTypes, Model } from 'sequelize';
import db from '.';

class ClubModels extends Model {
  public id?: number;

  public clubName: string;
}

ClubModels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'clubs',
    timestamps: false,
  },
);

export default ClubModels;
