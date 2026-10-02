import { ProductosController } from "../controllers/ProductosController";
import {
  RepositorioUsuariosPrisma,
  UnidadDeTrabajoPrisma,
} from "../repositories/prisma/RepositoriosPrisma";
import { RegistrarProductoNuevo } from "../services/RegistrarProductoNuevo";
import { prisma } from "./prisma";

/** Raíz de composición: aquí se inyectan las implementaciones concretas por constructor. */
export const productosController = new ProductosController(
  new RegistrarProductoNuevo(new UnidadDeTrabajoPrisma(prisma)),
  new RepositorioUsuariosPrisma(prisma),
);
