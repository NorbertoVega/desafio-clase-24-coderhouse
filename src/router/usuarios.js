const { Router } = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');

const router = Router();

const MongoStore = connectMongo.create({
    mongoUrl: 'mongodb+srv://norber:CoderHouse33@cluster0.bpobi.mongodb.net/sesiones?retryWrites=true&w=majority',
    ttl: 60
});

let name;

router.use(cookieParser());
router.use(session({
    store: MongoStore,
    secret: '123456789!"#$"$"#4',
    resave: false,
    saveUninitialized: false,
}));

router.get('/login', async (req, res) => {
    try {
        const username = req.query.username;
        req.session.username = username;
        name = req.session.username;
        res.send({ result: 'login ok' });
    }
    catch (err) {
        console.log(err);
        res.send({ error: err });
    }
});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err)
                res.send({ result: 'logout ok' , name: name});
            else
                res.send({ error: `Logout failed. Error: ${err}` });
        });
    }
    catch (err) {
        console.log(err);
        res.send({ error: err });
    }
});

router.get('/info', (req, res) => {
    try {
        
        res.send({
            cookies: req.cookies,
            session: req.session,
            username: req.session.username,
        });
    }
    catch (err) {
        console.log(err);
        res.send({ error: err });
    }
});

module.exports = router;