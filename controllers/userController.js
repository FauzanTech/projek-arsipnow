const { User } = require('../models');

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) return res.status(400).send('User tidak ditemukan!');

        user.no_telepon = req.body.no_telepon || user.no_telepon;
        user.alamat = req.body.alamat || user.alamat;
        user.password = req.body.password || user.password;

        await user.save();

        return res.status(200).send(`Data user ${user.nama} berhasil diupdate!`);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Gagal mengubah data user!');
    }
}