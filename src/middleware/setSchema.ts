import express, { Request, Response, NextFunction } from 'express';
import { TenantDomain, TenantTenant } from '../config/config'; // Import your Sequelize instance

// Middleware to set the tenant schema based on the domain name
export async function setTenantSchema(req: any, res: any, next: NextFunction) {
  const { host } = req.headers; // Extract the hostname
  console.log(`Request host: ${host}`);

  try {
    // Ensure the global schema store exists
    (global as any).schemaStore = (global as any).schemaStore || {};

    // Check if the schema for the current domain already exists in the global variable
    if ((global as any).schemaStore[host]) {
      // If it exists, use the existing schema
      (global as any).schemaName = (global as any).schemaStore[host];
      console.log(`Using existing schema for domain: ${host} - Schema: ${(global as any).schemaName}`);
      return next(); // Call next middleware
    }

    // Fetch the domain information to determine the tenant
    const domainData = await TenantDomain.findOne({
      where: { domain: host },
    });

    if (!domainData) {
      // If no domain found, proceed with public schema
      // console.log('Using public schema');
      // (global as any).schemaName = 'public'; // Set public schema in the global variable
      // (global as any).schemaStore[host] = 'public'; // Save to schemaStore for future requests
      return res.status(201).json({ error: 'Schema not found for this domain, using public schema' });
    }

    // Fetch the schema associated with the tenant
    const schemaData = await TenantTenant.findOne({
      where: { id: domainData.tenant_id },
    });

    if (!schemaData) {
      return res.status(404).json({ error: 'Schema not found for this domain' });
    }

    // Store the schema name in the global variable
    (global as any).schemaName = schemaData.schema_name;
    // Save the schema name in the global store for this domain
    (global as any).schemaStore[host] = schemaData.schema_name;

    console.log(`Using new schema for domain: ${host} - Schema: ${(global as any).schemaName}`);
    // Call next middleware
    next();
  } catch (error) {
    console.error("Error in setTenantSchema:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
