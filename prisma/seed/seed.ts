import "dotenv/config";
import { hashPassword } from "../../src/auth/password";
import { prisma } from "../../src/lib/prisma";

// Usuarios de DESARROLLO. La contraseña es de prueba y no debe usarse en producción.
const CONTRASENA_DEMO = "stleos123";

async function main() {
  const usuarios = [
    { nombre: "Gerente de Prueba", usuario: "gerente", rol: "GERENTE" as const },
    { nombre: "Encargado de Prueba", usuario: "encargado", rol: "ENCARGADO" as const },
    { nombre: "Cajero de Prueba", usuario: "cajero", rol: "CAJERO" as const },
  ];

  for (const u of usuarios) {
    await prisma.usuario.upsert({
      where: { usuario: u.usuario },
      update: {},
      create: { ...u, passwordHash: hashPassword(CONTRASENA_DEMO) },
    });
  }
  console.log(`Usuarios de prueba listos: ${usuarios.map((u) => u.usuario).join(", ")}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
