import * as Yup from 'yup';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

import authConfig from '../../config/auth';

class ScheduleController {
  async index(req, res) {
    const { page = 1, date } = req.query;

    const checkUserIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserIsProvider) {
      return res.status(400).json({ error: 'User is not a provider' });
    }

    const parsedDate = parseISO(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      // attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(appointment);
  }
}

export default new ScheduleController();
