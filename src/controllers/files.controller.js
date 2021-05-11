const { response } = require ('express')
const {uploadFile, getFile, deleteFile} = require('../helpers/s3')

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


    const archivo = new Archivo({
        idPaciente: id,
        nombreArchivo: file.name
    })


    try{
        await archivo.save({new:true})
        await uploadFile(file.tempFilePath, file.name, id, file.mimeType)

        res.status(201).json({
            ok:true, 
            msg: 'El archivo se subió correctamente',
            archivo
        })
    }catch(err){
        return res.status(500).json({ok:false, msg: err})
    }

}

const borrarArchivo = async (req, res = response) => {
    const {_id, fileName} = req.params

    try {
        const archivo = await Archivo.findOneAndDelete({idPaciente: _id, nombreArchivo: fileName})
        const result = await deleteFile(_id, fileName)

        console.log(result)
        res.status(201).json({
            ok:true, 
            msg: 'El archivo se eliminó correctamente',
            archivo
        })
    } catch (error) {
        return res.status(500).json({ok: false, msg: 'El archivo no se encontro'})

    }


}

const descargarArchivo = async (req, res = response) => {

    const {_id, fileName} = req.params

    const file = await getFile(_id, fileName)

    if (file) return file.pipe(res)
    
    return res.status(500).json({ok: false, msg: 'El archivo no se encontro'})

}


module.exports = {
    obtenerArchivos,
    subirArchivo,
    borrarArchivo,
    descargarArchivo
}