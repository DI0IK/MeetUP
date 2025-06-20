import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

export const registry = new OpenAPIRegistry();

export const getApiDocs = async () => {
  const swaggerFiles = require.context('../app', true, /swagger\.ts$/);

  swaggerFiles
    .keys()
    .sort((a, b) => b.length - a.length)
    .forEach((file) => {
      console.log(`Registering Swagger file: ${file}`);
      swaggerFiles(file).default?.(registry);
    });
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@/app/api/validation');

  try {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    const spec = generator.generateDocument({
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'MeetUP',
        description: 'API documentation for MeetUP application',
      },
    });
    return spec;
  } catch (error) {
    console.error('Error generating API docs:', error);
    throw new Error('Failed to generate API documentation');
  }
};
