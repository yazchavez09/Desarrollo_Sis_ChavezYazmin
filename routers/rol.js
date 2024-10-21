// Importa el módulo Express para manejar rutas HTTP
const express = require('express')
const Role = require('../models/SQL_Role'); // Importa el modelo Role

// Crea una nueva instancia de Router para definir rutas relacionadas con usuarios
const router = express.Router()

router.get('/' , getRoles ) //tomas algo
router.get('/:id' , getRole )
router.post('/' , postRole ) //subis
router.put('/:id' , putRole ) //modificar
router.delete('/:id' , deleteRole )


async function getRoles(req , res)
{
    try {
        const roles = await Role.findAll();
        res.json(roles);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

async function getRole(req , res)
{
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
          res.json(role);
        } else {
          res.status(404).json({ message: 'Rol no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

async function postRole(req , res)
{
    try {
        const newRole = await Role.create(req.body);
        res.status(201).json(newRole);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

async function putRole(req , res)
{
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
          await role.update(req.body);
          res.json(role);
        } else {
          res.status(404).json({ message: 'Rol no encontrado' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

async function deleteRole(req , res)
{
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
          await role.destroy();
          res.json({ message: 'Rol eliminado' });
        } else {
          res.status(404).json({ message: 'Rol no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = router;