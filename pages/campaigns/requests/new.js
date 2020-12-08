import { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

const RequestNew = (props) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    const campaign = Campaign(props.address);
    setLoading(true); setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>Create!</Button>
      </Form>
    </Layout>
  )
}

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
}


export default RequestNew;