import Configuration from '../models/Configuration';

class ListConfigController {
  async index(req, res) {
    const projects = await Configuration.findAll({
      attributes: ['id', 'name_project'],
    });

    return res.json(projects);
  }
}
export default new ListConfigController();
