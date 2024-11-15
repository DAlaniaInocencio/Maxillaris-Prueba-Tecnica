import express from "express";
import bodyParser from "body-parser";
import AppDataSource from "./config/database";
import router from "./routes/routes";
import authRoutes from "./auth/auth.routes";
import cors from "cors";
class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: [process.env.FRONT as string],
    }));
    this.routes();
  }

  private routes(): void {
    this.app.use("/auth", authRoutes);
    this.app.use("/api", router);
  }

  public async start() {
    try {
      await AppDataSource.initialize();
      console.log("Conexión a la base de datos exitosa");
      const port = process.env.PORT || 3001;

      if (process.env.NODE_ENV !== 'test') {
        this.app.listen(port, () => {
          console.log(`Servidor en http://localhost:${port}`);
        });
      }

    } catch (error) {
      console.error("Error al conectar con la base de datos", error);
    }
  }
}

export default Server;
