import UsersDaoMysql from '../db/daos/users.dao.mysqli.js';

export default class UserController {
    constructor() {
        this.db = new UsersDaoMysql();
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.db.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.db.getUserById(id);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createUser = async (req, res) => {
        try {
            const { name, age } = req.body;
            const newUserId = await this.db.createUser(name, age);
            const newUser = await this.db.getUserById(newUserId);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, age } = req.body;
            const updatedRows = await this.db.updateUser(id, name, age);
            if (updatedRows === 0) {
                res.status(404).send('User not found');
            } else {
                const updatedUser = await this.db.getUserById(id);
                res.json(updatedUser);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRows = await this.db.deleteUser(id);
            if (deletedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}