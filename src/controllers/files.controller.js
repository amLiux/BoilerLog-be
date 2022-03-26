const { response } = require('express');
const { respuestasValidas } = require('../constants/HTTP');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { uploadFile, getFile, deleteFile } = require('../helpers/s3');

const Archivo = require('../models/ArchivosModel');

const obtenerArchivos = async (req, res = response) => {
    try {
        const id = req.params._id;
        const archivos = await Archivo.find({ 'idPaciente': id }).lean();
    
        return construirRespuesta(respuestasValidas.ARCHIVOS_ENCONTRADOS, res, {archivos: [...archivos]});
    } catch(err) {
        console.error(err);
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }
    
};

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
        console.error(err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }

    return respuesta;

};

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
    try {
        const { _id, fileName } = req.params;

        const file = await getFile(_id, fileName);
    
        if (!file) return construirRespuesta(respuestasValidas.ARCHIVO_DESCONOCIDO, res);
        
        return file.pipe(res);
    
    } catch(err) {
        console.error(err);
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }
};


module.exports = {
    obtenerArchivos,
    subirArchivo,
    borrarArchivo,
    descargarArchivo
};