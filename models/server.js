const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const router = require('../routes/index');
const {connection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = 8080;
        this.userPath = '/users';
        this.authPath = '/auth';
        this.taskPath = '/tasks'
        // Database
        this.database();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    async database(){
        await connection();
    }

    middlewares(){
        // Soporte para URL ENCODE
        this.app.use(bodyParser.urlencoded({extended:true}));

        // Parser de cookie para HTTP request
        this.app.use(cookieParser());

        // Motor de renderizado
        this.app.engine('hbs', handlebars({
            defaultLayout: 'main',
            extname:'.hbs'
        }));
        
        this.app.set('view engine', 'hbs');
    }

    routes(){
        this.app.get('/', (req, res) => res.redirect('/home'));
        this.app.use('/', router.homeRoutes);
        this.app.use(this.userPath, router.userRoutes);
        this.app.use(this.authPath, router.guestRoutes);
        this.app.use('/', router.authRoutes);
        this.app.use(this.taskPath, router.taskRoutes);
    }

    listen(){
        this.app.listen(this.port, () => console.log("The NodeJs Server is Up!"));
    }
}

module.exports = Server;