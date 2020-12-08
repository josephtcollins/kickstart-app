import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import RequestRow from '../../../components/RequestRow';
import Campaign from '../../../ethereum/campaign';


const RequestIndex = (props) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return props.requests.map((request, i) => (
      <RequestRow
        key={i}
        id={i}
        request={request}
        address={props.address}
        approversCount={props.approversCount}
      />
    ));
  }

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {renderRows()}
        </Body>
      </Table>
      <div> Found {props.requestCount} requests.</div>
    </Layout>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((e, i) => campaign.methods.requests(i).call())
  );
  return { address, requests, requestCount, approversCount };
}

export default RequestIndex;