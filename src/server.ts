import express from 'express';
import { sequelize } from './config/config';
import { fetchDomainHandler } from './controllers/tenent-domain-controller';
import { setTenantSchema } from './middleware/setSchema';
import { getOrg, getOrganization } from './controllers/organization/organization-controller';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
// app.use(setTenantSchema);
// Routes
app.get('/domain', fetchDomainHandler);

app.get('/organization',setTenantSchema,getOrganization);
app.get('/org',getOrg);
// Sync database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
