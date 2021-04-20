const { response } = require ('express')
const path = require('path')
const fs = require('fs')

const Archivo = require('../models/ArchivosModel')

const obtenerArchivos = async (req, res = response) => {
    const id = req.params._id
    const archivos = await Archivo.find({'idPaciente': id}).lean()

    res.status(200).json({ok: true, archivos: [...archivos]})
}

const subirArchivo = async (req, res = response) => {

    const id = req.params._id

    if (!req.files || Object.keys(req.files). length === 0 || !req.files.file ){
        res.status(400).json({ok: false, msg: 'No hay archivos para subir'})
        return;
    }

    const {file} = req.files
    const uploadPathWoFile = path.join( __dirname, `../uploads/${id}/`)
    const uploadPathWiFile = path.join( __dirname, `../uploads/${id}/`, file.name)

    const archivo = new Archivo({
        idPaciente: id,
        nombreArchivo: file.name
    })

    try{
        await archivo.save({new:true})
    }catch(err){
        return res.status(500).json({ok:false, msg: err})
    }


    if (!fs.existsSync(uploadPathWoFile)) fs.mkdirSync(uploadPathWoFile)

    file.mv(uploadPathWiFile, err => {
        if(err) return res.status(500).json({ok: false, msg: err})
        res.status(201).json({
            ok:true, 
            msg: 'El archivo se subió correctamente',
            archivo
        })
    })

}

const borrarArchivo = () => {
    
}


module.exports = {
    obtenerArchivos,
    subirArchivo,
    borrarArchivo
}