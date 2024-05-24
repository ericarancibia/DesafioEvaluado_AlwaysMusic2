import pool from '../config/db.js';

const addUser = async (nombre, rut, curso, nivel) => {
  try {   
        const query = {
            text: 'INSERT INTO students (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [nombre, rut, curso, nivel]
    };

        const response = await pool.query(query);

        if (response.rowCount > 0) return response.rows[0];
    } catch (error) {
      console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
    }
  };

const getAll = async () => {
     try { 
        const query = {
        rowMode: 'array',
        text: 'SELECT * FROM students'
    };
        const response = await pool.query(query);

        if (response.rowCount > 0) return response.rows;
    } catch (error) {
      console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
    }
  };

const getUser = async (rut) => {
      try {
        const query = {
        text: 'SELECT * FROM students WHERE rut=$1',
        values: [rut] 
    };
        const response = await pool.query(query);   

        if (response.rowCount > 0) {
            return response.rows;
          } else {
            return "Usuario no encontrado";
          }
        } catch (error) {
          console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
        }
      };

const updateUser = async (rutActual, nuevoNombre, nuevoRut, nuevoCurso, nuevoNivel) => {
    try {  
        const query = {
        text: 'UPDATE students SET nombre=$2, rut=$3, curso=$4, nivel=$5 WHERE rut=$1 RETURNING *',
        values: [rutActual, nuevoNombre, nuevoRut, nuevoCurso, nuevoNivel]
    };
  
        const response = await pool.query(query);

        if (response.rowCount > 0) return response.rows[0];
    } catch (error) {
      console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
    }
  }

const deleteUser = async (rut) => {
     try { 
        const estudiante = await buscaresponsetudiante(rut);
    if (!estudiante) {
    const error = new Error('El RUT ingresado no corresponde a estudiante registrado.');
    error.status = 404;
    throw error;
  }
    const query = {
        text: 'DELETE FROM students WHERE rut=$1 RETURNING *',
        values: [rut]
    };
        await pool.query(query);
    } 
    catch (error) {
        console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
      }
    };

export { addUser, 
         getUser, 
         getAll, 
         updateUser, 
         deleteUser};