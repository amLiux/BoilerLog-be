const { response } = require('express');
const { respuestasValidas } = require('../constants/HTTP');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { uploadFile, getFile, deleteFile } = require('../helpers/s3');

const Archivo = require('../models/ArchivosModel');

const obtenerArchivos = async (req, res = response) => {
    const id = req.params._id;
    const archivos = await Archivo.find({ 'idPaciente': id }).lean();

    return construirRespuesta(respuestasValidas.ARCHIVOS_ENCONTRADOS, res, {archivos: [...archivos]});
}

const subirArchivo = async (req, res = response) => {
    let respuesta;
    const idPaciente = req.params._id;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        respuesta = construirRespuesta(respuestasValidas.PETICION_SIN_ARCHIVOS, res);
        return respuesta;
    }

    const { file: { name: nombreArchivo, tempFilePath, mimeType } } = req.files;

    const archivo = new Archivo({
        idPaciente,
        nombreArchivo
    });


    try {
        await archivo.save({ new: true });
        await uploadFile(tempFilePath, nombreArchivo, idPaciente, mimeType);

        respuesta = construirRespuesta(respuestasValidas.ARCHIVO_SUBIDO, res, archivo);
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }

    return respuesta;

}

const borrarArchivo = async (req, res = response) => {
    let respuesta;
    const { _id, fileName } = req.params;

    try {
        await Archivo.findOneAndDelete({ idPaciente: _id, nombreArchivo: fileName });
        await deleteFile(_id, fileName);

        respuesta = construirRespuesta(respuestasValidas.ARCHIVO_ELIMINADO, res);

    } catch (error) {
        respuesta = construirRespuesta(respuestasValidas.ARCHIVO_DESCONOCIDO, res);
        return respuesta;
    }

    return respuesta;
}

const descargarArchivo = async (req, res = response) => {
    console.log(req.params);
    const { _id, fileName } = req.params;

    const file = await getFile(_id, fileName);

    if (file) return file.pipe(res);

    return res.status(500).json({ ok: false, msg: 'El archivo no se encontro' });

}


module.exports = {
    obtenerArchivos,
    subirArchivo,
    borrarArchivo,
    descargarArchivo
}