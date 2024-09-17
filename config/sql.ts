import knex from 'knex';


export const connection = knex({
	client: 'pg',
	connection: {
	  host: '127.0.0.1',
	  user: 'postgres',
	  password: '1234',
	  database: 'task-project',
	  port: 5432
	},
	pool: {
	  afterCreate: function (conn: any, done: any) {
		conn.query('SELECT 1;', (err: Error) => {
		  if (err) {
			done(err, conn);
		  } else {
			conn.query('SELECT 1;', (err: Error) => {
			  done(err, conn);
			});
		  }
		});
	  },
	  min: Number(process.env.DATABASE_MIN_POOLS) || 0,
	  max: Number(process.env.DATABASE_MAX_POOLS) || 9,
	},
  });