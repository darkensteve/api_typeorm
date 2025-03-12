import express from 'express';
import { userService } from './user.service';

const router = express.Router();

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

export default router;

// Route functions
async function getAll(req: any, res: any, next: any) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getById(req: any, res: any, next: any) {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    await userService.create(req.body);
    res.json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
}

async function update(req: any, res: any, next: any) {
  try {
    await userService.update(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function _delete(req: any, res: any, next: any) {
  try {
    await userService.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}
