import { getDomainByName } from '../services/tenent-domain-service';

export const fetchDomainHandler = async (req: any, res: any) => {
  try {
    const { host } = req.headers;
    console.log("Hostname: ",host)
    if (!host || typeof host !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing domain parameter' });
    }

    const domainData = await getDomainByName(host);

    if (!domainData) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    return res.status(200).json(domainData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
