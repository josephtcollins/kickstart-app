import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

function CampaignIndex() {
  useEffect(() => {
    async function fetchData() {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      console.log(campaigns);
    }
    fetchData();
  })


  return <div>This is campaign list page</div>
}

export default CampaignIndex;