import { OrganizationOrganization, sequelize } from "../../config/config";
export const getOrganizationData = async (organization: string) => {
  try {
    const schemaName= (global as any).schemaName;
    console.log("organization",organization)
    const organizationData = await OrganizationOrganization.schema(schemaName).findOne({
      where: { name: organization },
    });
    return organizationData;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw new Error('Failed to fetch organization');
  }
};
export const getOrganizatio = async (organization: string) => {
  try {
    const schemaName= (global as any).schemaName;
    console.log("organization",organization)
    const organizationData = await OrganizationOrganization.schema(schemaName).findOne({
      where: { name: organization },
    });
    return organizationData;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw new Error('Failed to fetch organization');
  }
};