import UserInProject from '../models/UserInProject';
import User from '../models/User';

class ListUserInProject {
  async index(req, res) {
    const project = await UserInProject.findAll({
      where: { id_project: req.params.id },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'name',
            'username',
            'password',
            'configuration_id',
          ],
        },
      ],
    });

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    return res.json(project);
  }
}

export default new ListUserInProject();
