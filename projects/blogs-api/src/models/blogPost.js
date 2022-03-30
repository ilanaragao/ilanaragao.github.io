const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      tableName: 'BlogPosts',
      timestamps: false,
    },
  );

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPost;
