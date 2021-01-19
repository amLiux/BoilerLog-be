export const checkRole = (req, res, next) => {

    const {rol} = req.user

    rol !== 'ADMIN_ROLE' 
        ? res.status(401).json({ok: false, err: 'No estas autorizado.'})
        : next()

}