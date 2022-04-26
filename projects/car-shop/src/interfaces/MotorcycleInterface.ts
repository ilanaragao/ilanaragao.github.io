import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

type Motorcycle = z.infer<typeof MotorcycleSchema>;

export { Motorcycle, MotorcycleSchema };
