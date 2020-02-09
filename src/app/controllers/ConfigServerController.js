import * as Yup from 'yup';
import Configuration from '../models/Configuration';

class ConfigServerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name_project: Yup.string().required(),
      host: Yup.string().required(),
      port: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }
    const config = await Configuration.create(req.body);
    return res.json(config);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name_project: Yup.string().required(),
      host: Yup.string().required(),
      port: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const project = await Configuration.findOne({
      where: { id: req.params.id },
    });

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const config = await project.update(req.body);

    return res.json(config);
  }
}

export default new ConfigServerController();
