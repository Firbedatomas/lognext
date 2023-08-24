import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/../db/database.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pricesData = await sequelize.query('SELECT * FROM precios', { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(pricesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}
