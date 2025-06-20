import { registry } from '@/lib/swagger';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import fs from 'fs';
import path from 'path';

function recursiveFileSearch(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      recursiveFileSearch(filePath, fileList);
    } else if (file.match(/swagger\.ts$/)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function exportSwagger() {
  const filesToImport = recursiveFileSearch(
    path.join(process.cwd(), 'src', 'app', 'api'),
  );

  await Promise.all(
    filesToImport.map((file) => {
      return import(file)
        .then((module) => {
          if (module.default) {
            module.default(registry);
          }
        })
        .catch((error) => {
          console.error(`Error importing ${file}:`, error);
        });
    }),
  );

  await import('./src/app/api/validation');

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const spec = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'MeetUP',
      description: 'API documentation for MeetUP application',
    },
  });

  const outputPath = path.join(
    process.cwd(),
    'src',
    'generated',
    'swagger.json',
  );
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2), 'utf8');
  console.log(`Swagger JSON generated at ${outputPath}`);
}

exportSwagger().catch((error) => {
  console.error('Error exporting Swagger:', error);
});
