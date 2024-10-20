const {Sequelize} = require ('sequelize');
const config=require('./config.json')
const sequelize= new Sequelize(config.development.database,config.development.username,config.development.password,{
    host:config.development.host,
    dialect:config.development.dialect
})
sequelize.authenticate().then(()=>{
    console.log('conection valide');
    
}).catch((err)=>{
    console.log('erreur');
    
});
module.exports=sequelize;