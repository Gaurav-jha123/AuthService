const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')
  const app = express();
const apiRoutes = require('./routes/index');

const db =  require('./models/index');
const { User, Role } =  require('./models/index'); 

//const { User } = require('./models/index');
const bcrypt = require('bcrypt');


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        // if(process.env.DB_SYNC){
        //   db.sequelize.sync({alter: true});
        // }

        // const u1 = await User.findByPk(11);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
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