import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { create } from 'ipfs-http-client';


// conect to localhost
const clientIpfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http'
});


// creacion de tokens nfts
const Create = ({ marketplace, nft }) => {
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const uploadToIpfs = async (event) => {
        event.preventDefault();
        const currentFile = event.target.files[0];
        if (typeof currentFile !== 'undefined') {
            try {
                const cid = await clientIpfs.add(currentFile);
                setImage(`http://127.0.0.1:8080/ipfs/${cid.path}`);
            } catch (error) {
                console.log("ipfs image uploadToIpfs error: ", error);
            }
        }
    }

    // creacion NFT verificacion datos
    const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try {
            const result = await clientIpfs.add(JSON.stringify({ image, price, name, description }));
            mintThemList(result);
        } catch (error) {
            console.error("ipfs createNFT error: ", error);
        }
    }

    // creacion NFT
    const mintThemList = async (result) => {
        const uri = `http://127.0.0.1:8080/ipfs/${result.path}`;

        // crear nft
        await (await nft.mint(uri)).wait();
        const idNft = await nft.tokenCount();

        // dar permisos y migrar el nft al marketplace
        await (await nft.setApprovalForAll(marketplace.address, true));
        const listingPrice = ethers.utils.parseEther(price.toString());
        await (await marketplace.makeItem(nft.address, idNft, listingPrice));
    }

    return (
        <div>
            <div className='row'>
                <main role='main' className='col-lg-12 mx-auto' style={{ maxWidth: '1000px', paddingTop: '20px' }}>
                    <div className='content mx-auto'>
                        <Row className='g-4'>
                            <Form.Control type='file' required name='file' onChange={uploadToIpfs} />
                            <Form.Control onChange={(e) => setName(e.target.value)} size='lg' required type='texto' placeholder='name' />
                            <Form.Control onChange={(e) => setDescription(e.target.value)} size='lg' required type='texto' placeholder='description' as='textarea' />
                            <Form.Control onChange={(e) => setPrice(e.target.value)} size='lg' required type='number' placeholder='price (ETH)' />
                            <div className='g-grid px-0'>
                                <Button onClick={createNFT} variant='primary' size='lg'>Create and list NFT</Button>
                            </div>

                        </Row>



                    </div>
                </main>
            </div>
        </div>
    );
}

export default Create;