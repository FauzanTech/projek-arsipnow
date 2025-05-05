const { where } = require('sequelize');
const { suratMasuk } = require('../models');
const fs = require('fs');

exports.uploadSurat = async (req, res) => {
    try {
        const { no_surat, tgl_diterima, tgl_surat, perihal, pengirim } = req.body;
        const file = req.file;

        // console.log('req.file:', req.file);
        // console.log('req.body:', req.body);

        if (!file) return res.status(400).send('File harus diupload!');

        const suratBaru = await suratMasuk.create({
            no_surat,
            tgl_diterima,
            tgl_surat,
            perihal,
            pengirim,
            file_surat: file.path
        });

        res.status(201).json({
            message: 'Surat berhasil diupload',
            data: suratBaru
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menyimpan surat!');
    }
}

exports.getSurat = async (req, res) => {
    try {
        const idStr = req.params.id;
        const id = Number(idStr);
        const surat = await suratMasuk.findOne({where: { id }});

        if (!surat) return res.status(400).send('Surat tidak ditemukan!');
        
        res.status(200).json(surat);

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server!');
    }
}

exports.getAll = async (req, res) => {
    try {
        const surat = await suratMasuk.findAll();
        
        if (!surat) return res.status(400).send('Surat kosong!');
        
        res.status(200).json(surat);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server!');
    }
}

exports.updateSurat = async (req, res) => {
    try {
        const id = req.params.id;
        const surat = await suratMasuk.findByPk(id);
        if (!surat) return res.status(400).send('Surat tidak ditemukan!');

        if (req.file) {
            if (surat.file_surat && fs.existsSync(surat.file_surat)) {
                fs.unlinkSync(surat.file_surat);
            };

            surat.file_surat = req.file.path;
        };

        surat.no_surat = req.body.no_surat || surat.no_surat;
        surat.tgl_diterima = req.body.tgl_diterima || surat.tgl_diterima;
        surat.tgl_surat = req.body.tgl_surat || surat.tgl_surat;
        surat.perihal = req.body.perihal || surat.perihal;
        surat.pengirim = req.body.pengirim || surat.pengirim;

        await surat.save();

        return res.status(200).json({message:'Surat berhasil diupdate!', data: surat});

    } catch (error) {
        console.error(error);
        res.status(500).send('Surat gagal diperbarui!');
    }
}

exports.deleteSurat = async (req, res) => {
    try {
        const id = req.params.id;
        suratMasuk.destroy({where: { id }});

        return res.status(200).send('Surat berhasil dihapus!'); 

    } catch (error) {
        console.error(error);
        return res.status(500).send('Surat gagal dihapus!');
    }
    
}