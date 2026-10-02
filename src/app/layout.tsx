import type { ReactNode } from "react";

export const metadata = {
  title: "STLEOS",
  description: "Sistema Digital de Gestión Integral de Ventas e Inventario",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
