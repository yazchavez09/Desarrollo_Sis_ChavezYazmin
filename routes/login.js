const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());

// Configuración de conexión a la base de datos
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Configurar estrategia Local
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Campo enviado en la solicitud
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const [rows] = await db.query("SELECT * FROM Usuario WHERE nombre_us = ?", [username]);
        if (rows.length === 0) return done(null, false, { message: "Usuario no encontrado" });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.contraseña);
        if (!match) return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user); // Usuario autenticado
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ error: info.message });

    // Generar token JWT
    const token = jwt.sign({ id: user.id_us, role: user.id_rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  })(req, res, next);
});
