import User from '@/../../models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { businessName, fullName, phoneNumber, email, password } = req.body;

  // Comprobar si el correo electrónico o el nombre de usuario ya están en uso
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }],
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: 'El correo electrónico o nombre de usuario ya están en uso' });
  }

  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario en la base de datos
    const newUser = await User.create({ businessName, fullName, phoneNumber, email, password: hashedPassword });
    // Elimina la contraseña hasheada del objeto de respuesta
    const { password: _, ...safeUser } = newUser.toJSON();

    // Responde con éxito y los datos del nuevo usuario (sin la contraseña)
    res.status(201).json(safeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo registrar al usuario' });
  }
};
