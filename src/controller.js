import { pool } from './database.js';

class LibrosController{

    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req,res){
        const libro = req.body;
        const [result]  = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
        res.json({"Id Insertado": result.insertId});
    }

    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]);
        res.json("Se actualizo el libro");
    }

    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json("Se elimino el libro");
    }

}

export const libro = new LibrosController();
