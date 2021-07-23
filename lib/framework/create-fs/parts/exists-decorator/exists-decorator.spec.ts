import { createFs } from '@framework';
import { functionImportTest } from '@utils';

const { remove, exists, writeFile, createDirectory } = createFs({
  databaseVersion: 1,
  databaseName: 'exists',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('exists Function', () => {
  functionImportTest(exists);

  it('should check if directory exists', async () => {
    await expect(exists('test')).resolves.toBeFalsy();

    await createDirectory('test');
    await expect(exists('tes')).resolves.toBeFalsy();
    await expect(exists('test')).resolves.toBeTruthy();
  });

  it('should check if file exists', async () => {
    await expect(exists('file.txt')).resolves.toBeFalsy();

    await writeFile('file.txt', 'test');
    await expect(exists('file.tx')).resolves.toBeFalsy();
    await expect(exists('file.txt')).resolves.toBeTruthy();
    await expect(exists('test/file.tx')).resolves.toBeFalsy();

    await remove('file.txt');
    await expect(exists('file.txt')).resolves.toBeFalsy();
  });
});