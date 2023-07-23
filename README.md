Creating migration:
npx typeorm migration:create ./src/database/migrations/CreateUsersTable

Reverting migration:
npx typeorm migration:revert ./src/database/migrations/CreateSetting

running migration:
yarn migration:run
