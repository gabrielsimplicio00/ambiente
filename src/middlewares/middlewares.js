exports.middlewareGlobal = (req, res, next)=>{
    res.locals.umaVariavelLocal = 'Valor da variável local'
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