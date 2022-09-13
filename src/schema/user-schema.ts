import { check } from 'express-validator';

interface User {
    email: string,
    name: string
}

const schema = [
    check('email', 'Email Name is required').isEmail().notEmpty().trim().isLength({ min: 1 }),
    check('name', 'Name is required').notEmpty().isString().toLowerCase().trim().isLength({ min: 1 })
]



export { schema as userSchema, User }