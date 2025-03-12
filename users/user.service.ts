import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from './user.model';

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const userRepository = getRepository(User, 'default'); // Specify the 'default' connection
  return await userRepository.find();
}

async function getById(id: number) {
  const userRepository = getRepository(User, 'default'); // Specify the 'default' connection

  return await userRepository.findOne({ where: { id } });
}

async function create(params: any) {
  const userRepository = getRepository(User, 'default'); // Specify the 'default' connection

  // Validate if email exists
  if (await userRepository.findOne({ where: { email: params.email } })) {
    throw `Email "${params.email}" is already registered`;
  }

  // Create a new user instance
  const user = new User();
  user.email = params.email;
  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.title = params.title;
  user.role = params.role;

  // Hash the password and assign to passwordHash
  user.passwordHash = await bcrypt.hash(params.password, 10);

  // Save the user to the database
  await userRepository.save(user);
}

async function update(id: number, params: any) {
  const userRepository = getRepository(User, 'default'); // Specify the 'default' connection
  let user = await userRepository.findOne({ where: { id } });

  if (!user) throw 'User not found';

  // Hash password if it was entered
  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  // Merge new params into user
  Object.assign(user, params);

  // Save updated user
  await userRepository.save(user);
}

async function _delete(id: number) {
  const userRepository = getRepository(User, 'default'); // Specify the 'default' connection
  const user = await userRepository.findOne({ where: { id } });

  if (!user) throw 'User not found';

  await userRepository.remove(user);
}
