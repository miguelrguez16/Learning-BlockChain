import React, { Component } from 'react';
import Web3 from 'web3';
import smart_contract from '../abis/loteria.json';
import Navigation from './Navbar';
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

class Tokens extends Component {

  constructor(props) {
    super(props);
    this.valueInputCompra = React.createRef();
    this.valueInputDev = React.createRef();

    this.state = {
      contract: null,
      account: '0x0',
      loading: true,
      errorMessage: ''
    }
  }


  async componentDidMount() {
    // 1. Carga de Web3
    await this.loadWeb3();
    // 2. Carga de datos de la Blockchain
    await this.loadBlockchainData();
  }

  // 1. Carga de Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts);
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('¡Deberías considerar usar Metamask!');
    }
  }

  // 2. Carga de datos de la Blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log('networkid:', networkId);
    const networkData = smart_contract.networks[networkId];
    console.log('NetworkData:', networkData);

    if (networkData) {
      const abi = smart_contract.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }
  }

  _balanceTokens = async () => {
    try {
      console.log('Balance de tokens en ejecución ...');
      const _balanceCurrentUser = await this.state.contract.methods
        .balanceTokens(this.state.account).call();

      Swal.fire({
        icon: 'info',
        title: 'Balance',
        width: 500, padding: '3em',
        text: `${_balanceCurrentUser} tokens`,
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _balanceTokensSC = async () => {
    try {
      console.log('Balance de tokens del SC ejecución ...');
      const _balanceSC = await this.state.contract.methods
        .balanceTokensSC().call();

      Swal.fire({
        icon: 'info',
        title: 'Balance',
        width: 500, padding: '3em',
        text: `${_balanceSC} tokens`,
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _balanceEthersSC = async () => {
    try {
      console.log('Balance de tokens en Ethers del SC ejecución ...');
      const _balanceSCEthers = await this.state.contract.methods
        .balanceEthersSC().call();

      Swal.fire({
        icon: 'info',
        title: 'Balance',
        width: 500, padding: '3em',
        text: `${_balanceSCEthers} Ethers`,
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _compraTokens = async (_numTokens) => {
    try {
      console.log(`Compra de tokens: [${_numTokens}]`);
      const web3 = window.web3;
      const ethers = web3.utils.toWei(_numTokens, 'ether');
      await this.state.contract.methods.compraTokens(_numTokens).send(
        {
          from: this.state.account,
          value: ethers
        });
      Swal.fire({
        icon: 'success',
        title: '¡Compra de tokens realizada!',
        width: 500,
        padding: '3em',
        text: `Has comprado ${_numTokens} token/s por un valor de ${ethers / 10 ** 18} ether/s`,
      });
    } catch (err) {
      this.setState({ errorMessage: err });
    } finally {
      this.setState({ loading: false });
    }
  }

  _devolverTokens = async (_numTokens) => {
    console.log(`Devolucion tokens: [${_numTokens}]`);
    try {
      await this.state.contract.methods.devolverTokens(_numTokens).send({
        from: this.state.account
      });

      Swal.fire({
        icon: 'warning',
        title: 'Has devuelto los siguientes tokens',
        width: 500,
        padding: '3em',
        text: `Has devuelto ${_numTokens} token/s`,
      });

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div>
        <Navigation account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Gestión de mis tokens erc-20</h1>
                &nbsp;
                <Container>
                  <Row>
                    <Col>
                      <h4>Tokens user</h4>
                      <form
                        onSubmit={
                          (event) => {
                            event.preventDefault();
                            this._balanceTokens();
                          }}
                      >
                        <input type='submit'
                          className='bbtn btn-block btn-info btn-sm'
                          value='TOKENS USUARIO' />
                      </form>
                    </Col>
                    <Col>
                      <h4>Tokens SC</h4>
                      <form
                        onSubmit={
                          (event) => {
                            event.preventDefault();
                            this._balanceTokensSC();
                          }}
                      >
                        <input type='submit'
                          className='bbtn btn-block btn-info btn-sm'
                          value='TOKENS SC' />
                      </form>
                    </Col>
                    <Col>
                      <h4>ETHERS SC</h4>
                      <form
                        onSubmit={
                          (event) => {
                            event.preventDefault();
                            this._balanceEthersSC();
                          }}
                      >
                        <input type='submit'
                          className='bbtn btn-block btn-info btn-sm'
                          value='TOKENS SC' />
                      </form>
                    </Col>
                  </Row>
                </Container>
                <h4 style={{
                  marginTop: '20px'
                }}>Compra de tokens ERC20</h4>
                <form
                  onSubmit={
                    (event) => {
                      event.preventDefault();
                      const cantidad = this.valueInputCompra.value;
                      this._compraTokens(cantidad);
                    }}
                >
                  <input type='number' id='inputCompraTokens'
                    className='form-control mb-1'
                    placeholder='0'
                    ref={(input) => this.valueInputCompra = input}
                  />
                  <button type='submit'
                    className='bbtn btn-block btn-success btn-sm'>compra de Tokens</button>
                </form>
                <h4 style={{
                  marginTop: '20px'
                }}>
                  Devolución de tokens
                </h4>
                <form
                  onSubmit={
                    (event) => {
                      event.preventDefault();
                      const cantidad = this.valueInputDev.value;
                      this._devolverTokens(cantidad);
                    }}
                >
                  <input type='number'
                    className='form-control mb-1'
                    placeholder='0'
                    ref={(input) => this.valueInputDev = input} />
                  <input type='submit'
                    className='bbtn btn-block btn-success btn-sm' value='devolución de Tokens' />
                </form>
              </div>
            </main>
          </div>
        </div >
      </div >
    );
  }
}

export default Tokens;
