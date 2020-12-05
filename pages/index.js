import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

const renderCampaigns = (props) => {
  const items = props.campaigns.map(address => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true
    }
  });

  return <Card.Group items={items} />
}



const CampaignIndex = (props) => {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button content="Create campaign" icon="add" primary floated="right" />
        {renderCampaigns(props)}
      </div>
    </Layout>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

export default CampaignIndex;