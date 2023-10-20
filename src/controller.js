import { pool } from './database.js';

class LibrosController{

    async getAll(req, res){
        try{
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
        }catch(error){
            console.log(error);
        }
        
    }

    async getOne(req,res){
        try{
            const libro = req.body;
        const [result]  = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
        res.json(result);
        }catch(error){
            console.log(error);
        }
        
    }

    async add(req, res){
        try{
            const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
        res.json({"Id Insertado": result.insertId});
        }catch(error){
            console.log(error);
        }
        
    }

    async update(req, res){
        try{
            const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]);
        res.json("Se actualizo el libro");
        }catch(error){
            console.log(error);
        }
        
    }

    async delete(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json("Se elimino el libro");
        }catch(error){
            console.log(error)
        }
        
    }

}

export const libro = new LibrosController();
