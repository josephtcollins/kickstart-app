import web3 from'./web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x465807902E4FFa9447982B79b3B3C022BBbE343A'
);

export default instance;