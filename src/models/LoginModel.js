const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.erros = []
        this.user = null
    }
    // this.body is not iterable

    async register(){
        this.valida()
        if (this.erros.length > 0){
            return
        }
        try {
            this.user = await LoginModel.create(this.body)
        } catch (e) {
            console.log(e)
        }
        
    }

    valida(){
        this.cleanUp()
        if (!validator.isEmail(this.body.email)){
            this.erros.push('E-mail inválido')
        }
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.erros.push('A senha precisa ter entre 3 e 50 caracteres')
        }
    }

    cleanUp(){
        for(const key of this.body){
           if (typeof this.body[key] !== 'string'){
               this.body[key] = ''
           } 
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login