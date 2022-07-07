import { Router, Request, Response } from 'express';
import { execute } from '../class/dbConfig';
import { checkToken } from '../middlewares/midd_auth';
// const checkToken = require('../middlewares/midd_auth')

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const router = Router();

// Empleados class
router.get('/empleado_searchBy', async (req: Request, res: Response) => {
    const token = req.query.token;
    const wordToFind = req.query.wordToFind;
    if (!checkToken(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return
    }
    // "' + email + '"
    const empleado = await execute("SELECT * FROM empleado WHERE nombres LIKE CONCAT('%" + wordToFind + "%') ", []);

    res.json({
        ok: true,
        empleado: empleado
    });

});

router.get('/empleado_getById', async (req: Request, res: Response) => {
    const token = req.query.token;
    const idEmpleado = req.query.idEmpleado;
    if (!checkToken(token) || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'token o idEmpleado inválido'
        });
        return
    }
    // "' + email + '"
    const empleado = await execute('SELECT * FROM empleado WHERE  id="' + idEmpleado + '"', []);

    res.json({
        ok: true,
        empleado: empleado
    });

});

router.post('/empleado_add', async (req: Request, res: Response) => {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const fecha_ingreso = req.body.fecha_ingreso;
    const afp = req.body.afp;
    const cargo = req.body.cargo;
    const sueldo = req.body.sueldo;
    const token = req.body.token;

    if (!checkToken(token) || !nombres || !apellidos || !fecha_nacimiento || !fecha_ingreso || !afp || !cargo || !sueldo) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return
    }

    let sql = `INSERT INTO empleado(nombres,apellidos,fecha_nacimiento,fecha_ingreso,afp,cargo,sueldo)
    VALUES('${nombres}','${apellidos}','${fecha_nacimiento}','${fecha_ingreso}','${afp}','${cargo}','${sueldo}')`;
    const resp = await execute(sql, []);

    res.json({
        ok: true,
        sql: sql,
        resp: resp,
        nombres: nombres,
        apellidos: apellidos,
        fecha_nacimiento: fecha_nacimiento,
        fecha_ingreso: fecha_ingreso,
        afp: afp,
        cargo: cargo,
        sueldo: sueldo,
    });

});

router.post('/empleado_update', async (req: Request, res: Response) => {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const fecha_ingreso = req.body.fecha_ingreso;
    const afp = req.body.afp;
    const cargo = req.body.cargo;
    const sueldo = req.body.sueldo;
    const idEmpleado = req.body.idEmpleado;
    const token = req.body.token;

    if (!checkToken(token) || !nombres || !apellidos || !fecha_nacimiento || !fecha_ingreso || !afp || !cargo || !sueldo || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return
    }

    let sql = `UPDATE empleado
           SET nombres = ?,apellidos = ?,fecha_nacimiento = ?,fecha_ingreso = ?,afp = ?,cargo = ?,sueldo = ?
           WHERE id = ?`;
    let data = [nombres, apellidos, fecha_nacimiento, fecha_ingreso, afp, cargo, sueldo, idEmpleado];
    const resp = await execute(sql, data);

    res.json({
        ok: true,
        sql: sql,
        resp: resp,
    });

});

router.post('/empleado_deleteById', async (req: Request, res: Response) => {
    const idEmpleado = req.body.idEmpleado;
    const token = req.body.token;

    if (!checkToken(token) || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return
    }

    let sql = `DELETE FROM empleado WHERE id = ${idEmpleado}`;
    const resp = await execute(sql, []);

    res.json({
        ok: true,
        sql: sql,
        resp: resp,
        idEmpleado: idEmpleado,
    });

});

//  LOGIN

router.get('/loginObtenerDataToken', async (req: Request, res: Response) => {
    let token = req.query.data1;
    if (!checkToken(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return
    }
    // configDbMysql
    const f = await execute('SELECT * FROM usuario', []);

    res.json({
        ok: true,
        mensaje: 'Todo esta bien2!!'
    });

});

router.get('/obtener_dataToken', async (req: Request, res: Response) => {
    let token = req.query.token;
    if (!checkToken(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return
    }

    res.json({
        ok: true,
        mensaje: 'Todo esta bien2!!',
        tokenData: JSON.parse(checkToken(token).data),
    });
});

router.get('/usuarios_obtenerUsuarioPorEmail', async (req: Request, res: Response) => {
    let email = req.query.data1;
    if (!email) {
        res.json({
            ok: false,
            mensaje: 'No se ha recibido ningún correo electrónico.'
        });
        return
    }

    let user: any = await execute('SELECT * FROM usuario WHERE email="' + email + '"', []);
    if (user.length === 0) {
        res.json({
            ok: false,
            mensaje: 'No hay usuarios'
        });
        return
    }
    user = user[0]
    user.password = ':)';
    res.json({
        ok: true,
        data: user,
    });

});

// router.post('/login/:id', (req: Request, res: Response) => {
router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    let user: any = await execute('SELECT * FROM usuario WHERE email="' + email + '"', []);
    if (user.length === 0) {
        res.json({
            ok: false,
            mensaje: 'No hay usuarios'
        });
        return
    }
    user = user[0]
    const claveMd5 = md5(password);
    if (claveMd5 !== user.password) {
        res.json({
            ok: false,
            mensaje: 'No se pudo autenticar correctamente'
        });
        return
    }
    user.password = ':)';
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 10);
    const token = jwt.sign({
        exp,
        data: JSON.stringify(user)
    }, '@@@@@canvasandmorephotos');

    res.json({
        ok: true,
        mensaje: 'Login success',
        usuario: user,
        Token: token,
        Token_expiracion: exp,
    });

});

export default router;