import { getAll, getUnique } from './get';
import { prepareAllTables, prepareTable } from './prepare';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';

export default {
	get: {
		all: getAll,
		unique: getUnique
	},
	create,
	update,
	remove,
	prepare: {
    table: prepareTable,
    all: prepareAllTables
  }
};
