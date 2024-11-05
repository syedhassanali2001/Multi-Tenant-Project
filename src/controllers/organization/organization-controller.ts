import { getOrganizatio, getOrganizationData } from "../../services/organization/orgization-service";


export const getOrganization = async (req: any, res: any) => {
  try {
    const { organization_name } = req.body;
    console.log("Organization: ",organization_name)
    if (!organization_name || typeof organization_name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing organization parameter' });
    }
    const organizationData = await getOrganizationData(organization_name);

    if (!organizationData) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    return res.status(200).json(organizationData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getOrg = async (req: any, res: any) => {
  try {
    const { organization_name } = req.body;
    console.log("Organization: ",organization_name)
    if (!organization_name || typeof organization_name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing organization parameter' });
    }
    const organizationData = await getOrganizatio(organization_name);

    if (!organizationData) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    return res.status(200).json(organizationData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

