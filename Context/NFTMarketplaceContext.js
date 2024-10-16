import React, { useState, useEffect, useContext } from 'react';
import Web3Modal from "web3modal";
import { Contract, ethers } from 'ethers'; 
import axios from 'axios';
import { useRouter } from 'next/router';
// import { create as ipfsHttpClient } from "ipfs-http-client";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const pinataApiKey = '980a37aca1914dad9c53';
const pinataSecretApiKey = 'bd242653d6abce39afdd9e99abc75f3bc12675fd56abd681e35a5491ceab3c78';
// const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

// // const subdomain = ""
// const client = ipfsHttpClient({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       authorization: auth,
//     },
//   });

import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);

const connectingSmartContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        
        // Check the type of connection and ensure it's valid
        if (!connection) {
            throw new Error('Failed to establish connection');
        }

        // Updated for ethers@6.x
        const provider = new ethers.BrowserProvider(connection);
        
        // Check if provider is properly created
        if (!provider) {
            throw new Error('Failed to create provider');
        }

        const signer = await provider.getSigner();
        
        // Check if signer is available
        if (!signer) {
            throw new Error('Failed to get signer');
        }

        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.error("Something went wrong while connecting with the contract:", error);
    }
};


export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Create, Purchase and Sell Courses, Certifications and Notes";

    const [error, setError] = useState("");
    const [openError, setOpenError]= useState(false);
    const [currentAcco, setcurrentAcco] = useState("");
    const router = useRouter();

    const checkWalletConnected = async () => {
        try {
            if (!window.ethereum) 
                return setOpenError(true), setError("Please install MetaMask")
        
            
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setcurrentAcco(accounts[0]);
            } else {
                setError("No account found");
                setOpenError(true);
            }
        } catch (error) {
            setError("Something went wrong while connecting wallet:", error);
            setOpenError(true);
        }
    };

    useEffect(() => {
        checkWalletConnected();
    }, []);

   

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return (
                setOpenError(true), setError("Please install MetaMask")
            )
            
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",  // Corrected method name
            });
            setcurrentAcco(accounts[0]);
            // window.location.reload();
        } catch (error) {
            setError("Something went wrong while connecting wallet");
            setOpenError(true);
        }
    };
    useEffect(() => {
        if (currentAcco) {
            console.log("Current Account:", currentAcco);
        }
    }, [currentAcco]);

    const uploadToIPFS = async (file) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      
        let data = new FormData();
        data.append('file', file);
      
        const metadata = JSON.stringify({
          name: 'My NFT File',
          keyvalues: {
            exampleKey: 'exampleValue'
          }
        });
      
        data.append('pinataMetadata', metadata);
      
        const options = JSON.stringify({
          cidVersion: 0
        });
      
        data.append('pinataOptions', options);
      
        try {
          const response = await axios.post(url, data, {
            maxContentLength: 'Infinity', // Max content length because files can be large
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey
            }
          });
          console.log('File uploaded to IPFS:', response.data.IpfsHash);
          return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        } catch (error) {
          console.error('Error uploading to IPFS:', error);
          throw new Error('Failed to upload to IPFS');
        }
      };
      

      const createNFT = async (name,price,image,description,router) => {
        try {
        //   const { name, description, price } = formInput;
          if (!name || !description || !price || !image) {
            return setError("Data is missing"), setOpenError(true);
          }
      
          const data = JSON.stringify({ name, description, image });
      
          const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      
          try {
            const response = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
              }
            });
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            await createSale(ipfsUrl, price);
            router.push('/searchPage')
            console.log("NFT created and uploaded to IPFS:", ipfsUrl);
          } catch (error) {
            setError("Error uploading JSON data to IPFS:", error);
            setOpenError(true);
          }
        } catch (error) {
          setError("Error while creating NFT:", error);
          setOpenError(true);
        }
      };

      const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.parseUnits(formInputPrice, "ether");
            const contract = await connectingSmartContract();
    
            console.log("Contract fetched:", contract);
    
            // Log the call to getListingPrice
            const listingPrice = await contract.getListingPrice();
            console.log("Listing price fetched:", listingPrice.toString());
    
            const transaction = !isReselling
                ? await contract.createToken(url, price, { value: listingPrice.toString() })
                : await contract.resellToken(id, price, { value: listingPrice.toString() });
            
            await transaction.wait();
            console.log("Transaction completed:", transaction);
            
        } catch (error) {
            setError("Error while creating sale:", error);
            setOpenError(true);
        }
    };
    
    
    
    

    const fetchNFTs = async () => {
      try {
          const contract = await connectingSmartContract();  
  
          if (!contract) {
              throw new Error('Failed to get contract');
          }
  
          const data = await contract.fetchMarketItems();  
  
          const items = await Promise.all(
              data.map(async (item) => {
                  // Convert BigInt to regular number
                  const tokenId = Number(item.tokenId);
                  console.log('Fetched tokenId:', tokenId); // Debug log for tokenId
  
                  const tokenURI = await contract.tokenURI(tokenId);
                  const { data: { image, name, description } } = await axios.get(tokenURI);
                  const price = ethers.formatUnits(item.price.toString(), "ether");
                  
                  return { price, tokenId, seller: item.seller, owner: item.owner, image, name, description, tokenURI };
              })
          );
  
          console.log('Fetched Items:', items); // Debug log for fetched items
          return items;
      } catch (error) {
          setError("Error while fetching NFTs:", error);
          setOpenError(true);
          return [];
      }
  };
  
  
  

    useEffect(()=>{
        fetchNFTs();
    },[]);

    const fetchMyNFTsOrListedNFTs = async (type) => {
      try {
          const contract = await connectingSmartContract();
  
          // Fetch the appropriate data based on the type
          const data = type === "fetchItemsListed"
              ? await contract.fetchItemsListed()
              : await contract.fetchMyNFTs();
  
          // Check if the data is valid
          if (!data || !Array.isArray(data)) {
              throw new Error('No data returned or data is not an array');
          }
  
          // Process each item
          const items = await Promise.all(
              data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                  const tokenURI = await contract.tokenURI(Number(tokenId));
                  const { data: { image, name, description } } = await axios.get(tokenURI);
                  const price = ethers.formatUnits(unformattedPrice.toString(), "ether");
  
                  return { price, tokenId: Number(tokenId), seller, owner, image, name, description, tokenURI };
              })
          );
  
          return items;
      } catch (error) {
          setError("Error while fetching NFTs:", error);
          setOpenError(true);
          return [];  // Return an empty array in case of an error
      }
  };
  useEffect(()=>{
    fetchMyNFTsOrListedNFTs("fetchItemsListed");
  },[]);
  

    const buyNFT = async (nft) => {
        try {
            const contract = await connectingSmartContract();
            const price = ethers.parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
            await transaction.wait();
            router.push('/author');
        } catch (error) {
            setError("Error while buying NFT:", error);
            setOpenError(true);
        }
    };

    return (
        <NFTMarketplaceContext.Provider value={{
            uploadToIPFS, createNFT, connectWallet, fetchNFTs,
            checkWalletConnected, fetchMyNFTsOrListedNFTs, createSale,currentAcco, buyNFT, titleData, setOpenError,openError,error
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
