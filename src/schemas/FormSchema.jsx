const schema = Joi.object({
    name: Joi.string().min(3).required().label('Name'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    department: Joi.string().min(3).optional().label('Department'),
  });