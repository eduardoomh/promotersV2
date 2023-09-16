// cache.js

const cache = new Map();

async function obtenerDatos(key: any) {
    if (cache.has(key)) {
        return cache.get(key);
    }

    const datos = await obtenerDatosDeFuenteDeDatos(key);
    cache.set(key, datos);

    return datos;
}

async function obtenerDatosDeFuenteDeDatos(key: any) {
    // Simulación de una consulta a una base de datos
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `Datos para la clave ${key}`;
}

export { obtenerDatos };
