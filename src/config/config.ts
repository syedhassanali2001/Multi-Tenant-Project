import { Sequelize } from 'sequelize';
import { initTenantDomain } from '../models/tenant_domain';
import { initTenantTenant } from '../models/tenant_tenant';
import { initOrganizationOrganization } from '../models/organization_organization';

// Create the Sequelize instance for PostgreSQL connection

const sequelize = new Sequelize('postgres://postgres:SYED=8269909@localhost:5432/njdevdb', {
  dialect: 'postgres',
  logging: false, // Set to true for logging SQL queries
});

// Initialize models
const TenantDomain = initTenantDomain(sequelize);
const TenantTenant = initTenantTenant(sequelize);
const OrganizationOrganization =initOrganizationOrganization(sequelize)

// Establish associations if needed
TenantDomain.belongsTo(TenantTenant, { foreignKey: 'tenant_id' });
TenantTenant.hasMany(TenantDomain, { foreignKey: 'tenant_id' });


export { sequelize, TenantDomain, TenantTenant ,OrganizationOrganization};
