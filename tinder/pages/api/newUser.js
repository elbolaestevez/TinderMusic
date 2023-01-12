import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        try {
          console.log("REQ BODY", req.body);
          await db.connect();
          const findUser = await User.find({ email: req.body.email });
          if (findUser[0]) {
            console.log(findUser);
            console.log("El usuario ya existe2");
            return res.send(404);
          }
          console.log("Usuario no existe. A crearlo entonces");
          const { email } = req.body;
          const user = await new User({
            email,
          }).save();
          await db.disconnect();
          res.status(201).send("entro");
        } catch (err) {
          console.log(err);
        }
      }

      // Creación de usuario

      break;
    case "GET":
      {
        console.log(req.params);
        const findUser = await User.find({ email: req.params.email });
        if (findUser[0]) {
          console.log(findUser);
          console.log("El usuario ya existe2");
          return res.status(200).send(findUser);
        }
        res.status(404).send("No existe usuario");
      }
      break;

    case "PUT":
      {
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
