"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbConfig_1 = require("../class/dbConfig");
const midd_auth_1 = require("../middlewares/midd_auth");
// const checkToken = require('../middlewares/midd_auth')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const router = (0, express_1.Router)();
// Empleados class
router.get('/empleado_searchBy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const wordToFind = req.query.wordToFind;
    if (!(0, midd_auth_1.checkToken)(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return;
    }
    // "' + email + '"
    const empleado = yield (0, dbConfig_1.execute)("SELECT * FROM empleado WHERE nombres LIKE CONCAT('%" + wordToFind + "%') ", []);
    res.json({
        ok: true,
        empleado: empleado
    });
}));
router.get('/empleado_getById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const idEmpleado = req.query.idEmpleado;
    if (!(0, midd_auth_1.checkToken)(token) || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'token o idEmpleado inválido'
        });
        return;
    }
    // "' + email + '"
    const empleado = yield (0, dbConfig_1.execute)('SELECT * FROM empleado WHERE  id="' + idEmpleado + '"', []);
    res.json({
        ok: true,
        empleado: empleado
    });
}));
router.post('/empleado_add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const fecha_ingreso = req.body.fecha_ingreso;
    const afp = req.body.afp;
    const cargo = req.body.cargo;
    const sueldo = req.body.sueldo;
    const token = req.body.token;
    if (!(0, midd_auth_1.checkToken)(token) || !nombres || !apellidos || !fecha_nacimiento || !fecha_ingreso || !afp || !cargo || !sueldo) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return;
    }
    let sql = `INSERT INTO empleado(nombres,apellidos,fecha_nacimiento,fecha_ingreso,afp,cargo,sueldo)
    VALUES('${nombres}','${apellidos}','${fecha_nacimiento}','${fecha_ingreso}','${afp}','${cargo}','${sueldo}')`;
    const resp = yield (0, dbConfig_1.execute)(sql, []);
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
}));
router.post('/empleado_update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const fecha_ingreso = req.body.fecha_ingreso;
    const afp = req.body.afp;
    const cargo = req.body.cargo;
    const sueldo = req.body.sueldo;
    const idEmpleado = req.body.idEmpleado;
    const token = req.body.token;
    if (!(0, midd_auth_1.checkToken)(token) || !nombres || !apellidos || !fecha_nacimiento || !fecha_ingreso || !afp || !cargo || !sueldo || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return;
    }
    let sql = `UPDATE empleado
           SET nombres = ?,apellidos = ?,fecha_nacimiento = ?,fecha_ingreso = ?,afp = ?,cargo = ?,sueldo = ?
           WHERE id = ?`;
    let data = [nombres, apellidos, fecha_nacimiento, fecha_ingreso, afp, cargo, sueldo, idEmpleado];
    const resp = yield (0, dbConfig_1.execute)(sql, data);
    res.json({
        ok: true,
        sql: sql,
        resp: resp,
    });
}));
router.post('/empleado_deleteById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmpleado = req.body.idEmpleado;
    const token = req.body.token;
    if (!(0, midd_auth_1.checkToken)(token) || !idEmpleado) {
        res.json({
            ok: false,
            mensaje: 'parámetros inválidos'
        });
        return;
    }
    let sql = `DELETE FROM empleado WHERE id = ${idEmpleado}`;
    const resp = yield (0, dbConfig_1.execute)(sql, []);
    res.json({
        ok: true,
        sql: sql,
        resp: resp,
        idEmpleado: idEmpleado,
    });
}));
//  LOGIN
router.get('/loginObtenerDataToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.query.data1;
    if (!(0, midd_auth_1.checkToken)(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return;
    }
    // configDbMysql
    const f = yield (0, dbConfig_1.execute)('SELECT * FROM usuario', []);
    res.json({
        ok: true,
        mensaje: 'Todo esta bien2!!'
    });
}));
router.get('/obtener_dataToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.query.token;
    if (!(0, midd_auth_1.checkToken)(token)) {
        res.json({
            ok: false,
            mensaje: 'token inválido'
        });
        return;
    }
    res.json({
        ok: true,
        mensaje: 'Todo esta bien2!!',
        tokenData: JSON.parse((0, midd_auth_1.checkToken)(token).data),
    });
}));
router.get('/usuarios_obtenerUsuarioPorEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.query.data1;
    if (!email) {
        res.json({
            ok: false,
            mensaje: 'No se ha recibido ningún correo electrónico.'
        });
        return;
    }
    let user = yield (0, dbConfig_1.execute)('SELECT * FROM usuario WHERE email="' + email + '"', []);
    if (user.length === 0) {
        res.json({
            ok: false,
            mensaje: 'No hay usuarios'
        });
        return;
    }
    user = user[0];
    user.password = ':)';
    res.json({
        ok: true,
        data: user,
    });
}));
// router.post('/login/:id', (req: Request, res: Response) => {
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    let user = yield (0, dbConfig_1.execute)('SELECT * FROM usuario WHERE email="' + email + '"', []);
    if (user.length === 0) {
        res.json({
            ok: false,
            mensaje: 'No hay usuarios'
        });
        return;
    }
    user = user[0];
    const claveMd5 = md5(password);
    if (claveMd5 !== user.password) {
        res.json({
            ok: false,
            mensaje: 'No se pudo autenticar correctamente'
        });
        return;
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
}));
exports.default = router;
