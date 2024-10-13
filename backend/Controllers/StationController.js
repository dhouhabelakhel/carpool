const station=require('../Models/station')
exports.addStation=async(req,res)=>{
    try {
        body=req.body;
     const NewStation=await station.create({
        name:body.name,
        location:body.location
     }) 
     if(!NewStation){
        res.status(400).send({
            message:"failed to add the new station!!"
        })
     }else{
        res.status(201).send({
            message:"added succesffuly",
            data: NewStation
        })
     }
    } catch (error) {
        res.status(500).json({ error: error.message })   
    }
}
exports.getAllStations=async(req,res)=>{
    try {
        const page=parseInt(req.query.page)||1;
        const size=parseInt(req.query.size)||10;
        const offset = (page - 1) * size;
        const limit=size;
      const stations=await station.findAll({
        offset:offset,
        limit:limit
      });
      if(!station||station.length==-1){
        res.status(400).send('any station found!!')
      }  else{
        res.status(200).send({
            page:page,
            items:size,
            message:"stations :",
            data:stations
        })
      }
    } catch (error) {
        res.status(500).json({ error: error.message })   
  
    }
}