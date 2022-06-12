
import {environment} from '../../environments/environment';

export class EndPointConst {
    public static GET_COVID_STAT = `${environment.server}/statistics`;
    public static GET_ALL_COUNTRY = `${environment.server}/countries`;
    public static GET_COVID_HISTORY = `${environment.server}/history`;
}