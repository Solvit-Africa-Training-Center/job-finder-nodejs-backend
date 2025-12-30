import YAML from 'js-yaml';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

export const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, '../../swagger.yaml'), 'utf8'),
) as swaggerUi.JsonObject;
