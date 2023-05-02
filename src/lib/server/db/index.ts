
import tables from './tables';
import statements from './statements';

statements.prepare.all(Object.values(tables));

export default {
	tables
};
