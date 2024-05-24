import express from 'express';
const router = express.Router();

import {
    addUser,
    getUser,
    getAll,
    updateUser,
    deleteUser,
} from '../queries/queries.js';

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/agregar', async (req, res) => {
    try {
        const { nombre, rut, curso, nivel } = req.body;
        await addUser(nombre, rut, curso, nivel);

        console.log(`Estudiante ${nombre} agregado exitosamente`);
        res.status(200).send(`Estudiante ${nombre} agregado exitosamente`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al ingresar estudiante.');
    }
});

router.get('/consultaUsuario', async (req, res) => {
    try {
        const { rut } = req.query;
        const estudiante = await getUser(rut);

        if (!estudiante || Object.keys(estudiante).length === 0) {

            console.log('No se encontró RUT proporcionado.');
            return res.status(404).send('No se encontró RUT proporcionado.');

        } else {
            console.log(`Estudiante encontrado: ${JSON.stringify(estudiante)}`);
            res.json(estudiante);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar estudiante.');
    }
});

router.get('/consultaUsuarios', async (req, res) => {

    try {
        const estudiantes = await getAll();

        if (!estudiantes || estudiantes.length === 0) {

            console.log('No se encontraron estudiantes registrados.');
            return res.status(404).send('No se encontraron estudiantes registrados.');
        } else {
            console.log(`Estudiantes encontrados: ${JSON.stringify(estudiantes)}`);
            res.json(estudiantes);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al consultar estudiantes.');
    }
}
);

router.put('/actualizar', async (req, res) => {
    try {
        const { rutActual, nuevoNombre, nuevoRut, nuevoCurso, nuevoNivel } = req.body;
        await updateUser(rutActual, nuevoNombre, nuevoRut, nuevoCurso, nuevoNivel);

        console.log(`Estudiante ${nuevoNombre} actualizado exitosamente`);
        res.status(200).send(`Estudiante ${nuevoNombre} actualizado exitosamente`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar estudiante.');
    }
});

router.delete('/eliminar', async (req, res) => {
    try {
        const { rut } = req.query;
        await deleteUser(rut);

        console.log(`Estudiante con RUT ${rut} ha sido eliminado exitosamente`);
        res.status(200).send(`Estudiante con RUT ${rut} ha sido eliminado exitosamente`);

    } catch (error) {
        console.error(error);

        if (error.status === 404) {
            res.status(404).send(error.message);
        }
        else {
            res.status(500).send('Error al eliminar estudiante.');
        }
    }
});

router.get('*', (req, res) => {
    res.status(404).send('Not found');
});

export default router;
