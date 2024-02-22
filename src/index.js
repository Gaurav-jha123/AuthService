const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')
  const app = express();
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');

const { User } = require('./models/index');
const bcrypt = require('bcrypt');
const UserRepository = require('./repository/user-repository');


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        // const repo = new UserRepository();
        // const response =await repo.getById(3);
        // console.log(response.email);
        // const service = new UserService();
        // const newToken = service.createToken({email: 'cvent@admin.com', id: 1});
        // console.log('new token is', {newToken} );
        // const response = service.verifyToken(newToken);
        // console.log(response);
        //  
    });
}

prepareAndStartServer(); 