module.exports = (mongoose) => {
    const User = mongoose.model(
      'users',
      mongoose.Schema(
        {
          name: { required: true, type: String },
          email: { required: true, type: String },
          role: { required: true, type: String },
          active: { required: false, type: Boolean },
          photo: { required: true, type: String },
          password: { required: true, type: String },
        },
        { timestamps: true }
      )
    );
  
    return User;
};
  