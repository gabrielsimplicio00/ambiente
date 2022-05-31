exports.middlewareGlobal = (req, res, next)=>{
    res.locals.erros = req.flash('erros')
    res.locals.success = req.flash('success')
    next()
}

exports.checkCSRFError = (erro, req, res, next)=>{
    if(erro){
        return res.send('ERRO')
    }
    next()
}

exports.CSRFMiddleware = (req, res, next)=> {
    res.locals.csrfToken = req.csrfToken()
    next()
}