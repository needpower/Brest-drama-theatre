import reduxCRUD from 'redux-crud';
import { MODEL_NAME } from './model';

const reducer = reduxCRUD.List.reducersFor(MODEL_NAME);

export default reducer;
