import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppoitmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if (findAppoitmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked'});
  }

  const appointment = {
    id: v4(),
    provider,
    date: parsedDate
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
