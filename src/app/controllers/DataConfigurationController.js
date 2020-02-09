import Configuration from '../models/Configuration';

class ListUserInProject {
  async index(req, res) {
    const project = await Configuration.findOne({
      where: { id: req.params.id },
    });

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    return res.json(project);
  }
}

export default new ListUserInProject();
