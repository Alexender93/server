import {body} from 'express-validator'
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль минимум 5 символов').isLength({min: 5}),
   ]

    export const registerValidation = [
body('email').isEmail(),
body('password').isLength({min: 5}),
body('fullName').isLength({min: 3}),
body('avatarUrl').optional().isURL()

]
export const postCreateValidation = [
    body('title').isLength({min: 3}),
    body('text').isLength({min: 5}),
    body('tags').optional().isString(),
    body('imageUrl').optional().isString()
    
    ]