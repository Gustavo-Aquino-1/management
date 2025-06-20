import { Status } from '@prisma/client';
import { filter } from 'rxjs';
import {
  baseConfigFilterString,
  generateFilterDate,
  generateFilterEnum,
  generateFilterNum,
  generateFilterString,
} from 'src/utils/prisma.easy';

const mapTodo = {
  // id: { type: 'string' },
  title: { filter: generateFilterString, config: baseConfigFilterString },
  description: { filter: generateFilterString, config: baseConfigFilterString },
  urgency: { filter: generateFilterNum, config: {} },
  createdAt: { filter: generateFilterDate, config: {} }, // se tiver finishDate sera passada na mesma variavel juntando com underline por exemplo, startDate_finishdate, intiendes?
  status: { filter: generateFilterEnum },
};

export default mapTodo;
