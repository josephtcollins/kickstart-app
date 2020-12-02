import web3 from'./web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xF2CDFEf3360c4939ccE24117AB7bb131C41438e6'
);

export default instance;