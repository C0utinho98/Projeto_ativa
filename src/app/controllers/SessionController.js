import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';
import Configuration from '../models/Configuration';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Configuration,
          attributes: ['id', 'name_project', 'host', 'port', 'enable_project'],
        },
      ],
    });

    const checkPassword = await User.findOne({ where: { password } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!checkPassword) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const { id } = user;

    return res.json({
      user,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
