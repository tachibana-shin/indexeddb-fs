import { functionImportTest } from '@utils';

import { existsDecorator, writeFileDecorator } from '..';
import { initializeObjectStoreDecorator } from '@core/utils';
import { removeDecorator } from './remove-decorator.function';

const databaseVersion = 1;
const rootDirectoryName = 'root';
const databaseName = 'databaseName';
const objectStoreName = 'objectStoreName';

const initializeObjectStore = initializeObjectStoreDecorator({
  databaseName,
  databaseVersion,
  objectStoreName,
});

const exists = existsDecorator({ rootDirectoryName, initializeObjectStore });

const remove = removeDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

const writeFile = writeFileDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('remove Function', () => {
  functionImportTest(remove);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(remove('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the user wants to delete a file that does not exist', async () => {
    await expect(remove('file.txt')).rejects.toThrow(
      '"file.txt" file or directory does not exist.',
    );
  });

  it('should remove created file in root directory', async () => {
    await writeFile('file1.txt', 'test content');

    await remove('file1.txt');
    await expect(exists('file1.txt')).resolves.toBeFalsy();
  });
});
