const { where } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
// const sequelize = require('sequelize')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where:  {email} })

        if (!user) return res.status(404).send('Email tidak ditemukan');

        const valid = bcrypt.compare(password, user.password);
    
        if (valid){
            return res.status(200).send('Login berhasil!');
        } else {
            return res.status(401).send('Password salah');
        }
        
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).send('Terjadi kesalahan pada server');
    }

}