const express = require('express');
const router = express.Router();
/**
 * Kullandığımız Kütüphaneleri ekliyoruz.
 */
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
/**
 * JWT oluştururken kullandığımız gizli anahtarımız.
 */
const secretKey = "topSecretKey";


/**
 * JWT Middleware
 */
router.use(
    expressJwt(
        {
            secret: secretKey
            , algorithms: ["HS256"]
        }
    )
        .unless(({path: ['/api/v1/login']})));

/**
 * @GET users
 */
router.get('/users', function (req, res, next) {
    const fakeUsers = [
        {
            name: "Tolga Karabulut",
            gender: "male",
            age: 27,
            email: "tolga.karabulut@medianova.com"
        },
        {
            name: "Jhon Doe",
            gender: "male",
            age: 30,
            email: "jhon.doe@example.com"
        }
    ];
    res.json(fakeUsers).status(200);
});

/**
 * Basit bir login işlemi
 */
router.post('/login', (req, res) => {
    if (
        req.body.username !== 'admin'
        && req.body.password !== 'password'
    ) {
        res.json(
            {message: 'Username and password invalid'}
            )
            .status(400);
    }
    const token = jwt.sign(
        {name: req.body.username}
        , secretKey
        , {expiresIn: 60 * 2, algorithm: 'HS256' }
    );
    res.json({"_token": token});
});

module.exports = router;
