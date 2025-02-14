import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any> = z.object({})) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Check if id is a number
			if (req.params.id && isNaN(Number(req.params.id))) {
				res.status(400).json({ error: 'Invalid id' });
			}

			// Clean the request body from any extra fields
			schema.parse(req.body);
			req.cleanBody = _.pick(req.body, Object.keys(schema.shape));

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue: any) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}));

				res.status(400).json({ error: 'Invalid data', details: errorMessages });
			} else {
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
  };
}