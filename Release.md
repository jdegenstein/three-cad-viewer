To release a new version, call:

1. Clean dist folder

   ```shell
   yarn run clean
   ```

2. Build package

   ```shell
   yarn run build
   ```

3. Publish package

   ```shell
   npm publish
   ```

4. Push release, e.g. 1.2.5

   ```shell
   git tag  v1.2.5
   git push
   git push --tags
   ```