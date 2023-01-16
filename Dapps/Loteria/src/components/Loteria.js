import React, { Component } from 'react';
import Web3 from 'web3';
import smart_contract from '../abis/loteria.json';
import Navigation from './Navbar';
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

class Loteria extends Component {

    constructor(props) {
        super(props);
        this.compraBoletosInput = React.createRef();
        this.state = {
            contract: null,
            account: '0x0',
            loading: true,
            errorMessage: '',
            precioBoleto: 0,
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

    _compraBoletos = async (_numBoletos) => {
        console.log(`Compra de boletos de loteria [${_numBoletos}]`);
        try {
            await this.state.contract.methods.compraBoleto(_numBoletos).send({
                from: this.state.account
            });

            Swal.fire({
                icon: 'success',
                title: 'Compra de boletos',
                width: '500px',
                padding: '3em',
                text: `Has comprado ${_numBoletos} boleto/s`,
            });

        } catch (err) {
            this.setState({ errorMessage: err });
        } finally {
            this.setState({ loading: false });
        }
    }

    _precioBoleto = async () => {
        console.log(`Precio de un boletos de loteria`);
        try {
            const _precio = await this.state.contract.methods.precioBoleto().call();
            this.setState({ precioBoleto: _precio });

        } catch (err) {
            this.setState({ errorMessage: err });
        } finally {
            this.setState({ loading: false });
        }
    }

    _tusBoletos = async () => {
        console.log(`Visualización de los boletos de loteria para dir: [${this.state.account}]`);
        try {
            const _boletos = await this.state.contract.methods.tusBoletos(
                this.state.account
            ).call();

            Swal.fire({
                icon: 'info',
                title: 'Balance',
                width: 500, padding: '3em',
                text: `Tus boletos son: ${_boletos}`,
            });

        } catch (err) {
            this.setState({ errorMessage: err });
        } finally {
            this.setState({ loading: false });
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
                                <h1>Gestión de la loteria</h1>

                                <h3>Compra de boletos</h3>
                                <form
                                    onSubmit={
                                        (event) => {
                                            event.preventDefault();
                                            const cantidad = this.compraBoletosInput.value;
                                            this._compraBoletos(cantidad);
                                        }}
                                >
                                    <input
                                        type='number' className='form-control mb-1'
                                        placeholder='0' ref={(input) => this.compraBoletosInput = input}
                                    />
                                    <input type='submit'
                                        className='bbtn btn-block btn-success btn-sm'
                                        value='compra de boletos'
                                    />
                                </form>
                                <Container>
                                    <Row>
                                        <Col style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
                                            <h3>Precio de boletos</h3>
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                this._precioBoleto();
                                            }}
                                            >
                                                {this.state.precioBoleto} Ethers
                                            </button>
                                        </Col>
                                        <Col style={{ marginTop: '20px' }}>
                                            <h3>Mis boletos</h3>
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                this._tusBoletos();
                                            }}>BOLETOS</button>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </main>
                    </div>
                </div >
            </div >
        );
    }
}

export default Loteria;
