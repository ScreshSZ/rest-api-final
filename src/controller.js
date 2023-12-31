import { pool } from './database.js';

class LibrosController{

    //Funcionalidad para mostrar todos los libros en la base de datos
    async getAll(req, res){
        try{
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un error al obtener los libros"});
        }
        
    }

    //Funcionalidad para obtener un libro de acuerdo al ID
    async getOne(req,res){
        try{
            const libro = req.body;
        const [result]  = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
        if(result.length > 0){
            res.json(result);
        }else{
            res.json({"Mensaje": "No se Encontro resultado"})
        }
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un error al obtener el libro"});
        }
        
    }

    //Funcionalidad para ingresar un libro con sus distintos datos
    async add(req, res){
        try{
            const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
        res.json({"Id Insertado": result.insertId});
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un error al añadir un libro"});
        }
        
    }

    //Funcionalidad para editar/actualizar los datos de un libro ya existente
    async update(req, res){
        try{
            const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]);
        res.json("Se actualizo el libro");
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un error al actualizar un libro"});
        }
        
    }

    //Funcionalidad para eliminar un libro de acuerdo a su ISBN
    async delete(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json("Se elimino el libro");
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un error al intentar eliminar un libro"});
        }
        
    }

}

export const libro = new LibrosController();
