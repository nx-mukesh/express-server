import { Request, Response, NextFunction } from "express";
import trainee from '.';

class Trainee {
  getTrainee(req: Request, res: Response, next: NextFunction) {
    const trainee = [
      {
        id: 1,
        name: "Mukesh",
        address: "Noida",
        role: "SD1",
      },
      {
        id: 2,
        name: "Rajeev",
        address: "New Delhi",
        role: "HR",
      },
      {
        id: 3,
        name: "Narayan Murti",
        address: "Bengaluru",
        role: "CEO",
      },
    ];
    return res
      .status(200)
      .send({ message: "User Fetched Successfully", data: trainee });
  }
 
//   addTrainee(req: Request, res: Response, next: NextFunction) {
//     const { name } = req.body;
//     if(!name){
//         return res.status(400).send({message:"trainee details required", error:"bad request"})
//     }
//     console.log(trainee)
//     console.log(typeof(trainee))
//     return res.status(200).send({status:200, message:"user added successfully"})
//   }
}

export default new Trainee();
