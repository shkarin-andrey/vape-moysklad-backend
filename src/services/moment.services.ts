import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class MomentService {
  getStartMonth(monthId: number) {
    return moment()
      .subtract(monthId, 'months')
      .startOf('month')
      .format('YYYY-MM-DD HH:mm');
  }

  getEndMonth(monthId: number) {
    return moment()
      .subtract(monthId, 'months')
      .endOf('month')
      .format('YYYY-MM-DD HH:mm');
  }
}
