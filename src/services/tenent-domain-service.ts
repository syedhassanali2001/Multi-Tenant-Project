import { TenantDomain } from '../models/tenant_domain';

export const getDomainByName = async (domain: string) => {
  try {
    console.log("domain",domain)
    const domainData = await TenantDomain.findOne({
      where: { domain: domain },
    });
    return domainData;
  } catch (error) {
    console.error('Error fetching domain:', error);
    throw new Error('Failed to fetch domain');
  }
};
