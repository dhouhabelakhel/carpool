const {Sequelize} = require ('sequelize');

const sequelize= new Sequelize('carpool','root','',{
    host:'localhost',
    dialect:'mysql'
})
sequelize.authenticate().then(()=>{
    console.log('conection valide');
    
}).catch((err)=>{
    console.log('erreur');
    
});
module.exports=sequelize;