# Sincronía · Gestión de clientes

Página inicial en React para PF3872.

## Ejecutar
Requisitos: Node.js 20.19+ o 22.12+ y npm.

```bash
npm install
npm run dev
```

## Compilar
```bash
npm run build
npm run preview
```

## Alcance
Listado de clientes (identificador, nombre, correo y teléfono), búsqueda y botón Nuevo cliente en el encabezado. Cada fila contiene iconos accesibles para editar y eliminar. Incluye formularios de demostración y confirmación al eliminar.

Los datos son ficticios y se guardan únicamente en el estado de React. Recargar restaura los ejemplos. La persistencia real y el backend deben implementarse en las siguientes historias; esta vista por sí sola no cumple la entrega CRUD completa.

## Archivos
- src/main.jsx: componentes y comportamiento de la página.
- src/styles.css: estilos responsivos.
