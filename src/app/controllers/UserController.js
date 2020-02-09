import * as Yup from 'yup';
import User from '../models/User';
import UserInProject from '../models/UserInProject';
import Configuration from '../models/Configuration';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }
    if (req.body.configuration_id) {
      const projectExist = await Configuration.findByPk(
        req.body.configuration_id
      );
      if (!projectExist) {
        return res.status(400).json({ error: 'Project not exist' });
      }

      const userExists = await User.findOne({
        where: {
          username: req.body.username,
          configuration_id: req.body.configuration_id,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exist.' });
      }
    }

    const { id, name, username, password, provider } = await User.create(
      req.body
    );

    const register = req.body.configuration_id
      ? await UserInProject.create({
          id_user: id,
          id_project: req.body.configuration_id,
        })
      : '';

    return res.json({
      id,
      name,
      username,
      password,
      provider,
      register,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const { oldPassword } = req.body;

    const user = await User.findByPk(id);
    const checkPassword = await User.findOne({
      where: { password: oldPassword },
    });

    if (oldPassword && !checkPassword) {
      res.status(401).json({ error: 'Password incorrect' });
    }

    const {
      name,
      username,
      password,
      provider,
      configuration_id,
    } = await user.update(req.body);
    return res.json({
      id,
      name,
      username,
      password,
      provider,
      configuration_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.send();
  }
}

export default new UserController();
