 const Login = require('../models/LoginModel')
 
 exports.index = (req, res) => {
     res.render('login')
 }

 exports.register = async (req, res)=>{
     try {
        const login = new Login(req.body)
        await login.register()
    
        if(login.erros.length > 0){
            req.flash('erros', login.erros)
            req.session.save(function(){
                return res.redirect('back')
            })
            return
        }

            req.flash('success', 'Seu usuário foi criado com sucesso.')
            req.session.save(function(){
                return res.redirect('back')
            })
     } catch (e) {
         console.log(e)
         res.render('404')
     }
 }
