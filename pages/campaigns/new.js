import { useState } from 'react';
import Layout from '../../components/Layout';
import { Input, Button, Form, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

const onSubmit = async (e, minContribution, setErrorMessage, setLoading) => {
  e.preventDefault(); setLoading(true); setErrorMessage('');
  try {
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(minContribution)
      .send({ from: accounts[0] });
    Router.pushRoute('/');
  } catch (err) {
    setErrorMessage(err.message);
  }
  setLoading(false);
};

const CampaignNew = (props) => {
  const [minContribution, setMinContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(errorMessage);

  return (
    <Layout>
      <h3>Create Campaigns.</h3>
      <Form onSubmit={(e) => onSubmit(e, minContribution, setErrorMessage, setLoading)} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={e => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>Create!</Button>
      </Form>
    </Layout>
  );
}

export default CampaignNew;