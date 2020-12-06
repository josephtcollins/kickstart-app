import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const RequestRow = (props) => {
  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0]
    });
  }

  const onFinalize = async () => {
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0]
    });
  }

  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      <Cell>
        {!request.complete &&
          <Button color="green" basic onClick={onApprove}>Approve</Button>
        }
      </Cell>
      <Cell>
        {!request.complete &&
          <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
        }
      </Cell>
    </Row >
  )
}

export default RequestRow;