import React, { Component } from 'react';
import Web3 from 'web3';
import smart_contract from '../abis/loteria.json';
import Navigation from './Navbar';

class Ganador extends Component {

    constructor(props) {
        super(props)
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

    render() {
        return (
            <div>
                <Navigation account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto">
                                GANADORRR
                            </div>
                        </main>
                    </div>
                </div >
            </div >
        );
    }
}

export default Ganador;
