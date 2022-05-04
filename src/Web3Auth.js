import React from "react";
import { useState, useEffect } from "react";
import Akhil2 from "./Akhil2.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Web3 from "web3";

function Web3Auth() {
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
    user,
  } = useMoralis();
  const [balance, setBalance] = useState(0);
  const [toAddress, setToAddress] = useState("");

  const [email, setEmail] = useState("");

  //Magic Authentication
  const handleCustomLogin = async () => {
    test = await authenticate({
      provider: "web3Auth",
      chainId: "0x13881",
      clientId:
        "436413199915-u37uqaqgavrvhs7kc4k3gccq2ukihrh1.apps.googleusercontent.com",
      loginMethods: ["google", "email_passwordless"],
    });
    console.log(test);
  };

  const fetchBalance = async () => {
    const options = { chain: "0x13881" };
    const balance = await Moralis.Web3API.account.getNativeBalance(options);
    console.log(balance.balance / 10 ** 18);
    setBalance(balance.balance / 10 ** 18);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  //Magic Transfer
  const handleTransfer = async () => {
    const valueToTransfer = Moralis.Units.ETH("0.005");
    await Moralis.transfer({
      amount: valueToTransfer,
      receiver: toAddress,
      type: "native",
    })
      .then((e) => {
        alert("sucesfully transfered");
      })
      .catch((e) => {
        alert(e, "Enter wallet address of the recipient");
      });
    await fetchBalance();
  };

  const handleSignTransaction = async () => {
    try {
      await Moralis.enableWeb3();
      const web3 = new Web3(Moralis.provider);
      const accounts = await web3.eth.getAccounts();
      console.log("moralis>>", Moralis.sign());
      // only supported with social logins (openlogin adapter)
      const txRes = await web3.eth.sign({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      console.log("txRes", txRes);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function donate() {
    let options = {
      chain: Moralis.Chains.POLYGON_MUMBAI,
      contrctAddress: "0xB775E5A220C769249258054672112664090E99a5",
      functionName: "count",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "count",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "string",
              name: "metadataURI",
              type: "string",
            },
          ],
          name: "payToMint",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "_data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    };

    const message = await Moralis.executeFunction(options);
    console.log("ok-message", message);
  }

  async function test() {
    const readOptions = {
      contractAddress: "0xB775E5A220C769249258054672112664090E99a5",
      functionName: "count",
      abi: Akhil2.abi,
    };

    const message = await Moralis.executeFunction(readOptions);
    console.log(parseInt(message));
  }
  async function test2() {
    const readOptions = {
      contractAddress: "0xB775E5A220C769249258054672112664090E99a5",
      functionName: "payToMint",
      abi: Akhil2.abi,
      params: {
        recipient: "0x38CCc7733509bA6a02aC510f2Afbb49f57219a7E",
        metadataURI:
          "https://certisure.infura-ipfs.io/ipfs/QmTxnZyVR7dRawSzDUAAqQbracUwuwfvk1BUFzhpuhQvD2",
      },
      msgValue: Moralis.Units.ETH("0.005"),
    };

    const message = await Moralis.executeFunction(readOptions);
    console.log(parseInt(message));
  }

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          {isAuthenticating && <p>Authenticating</p>}
          {authError && <p>{JSON.stringify(authError.message)}</p>}
          <div>
            {/* <input
            type={"email"}
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> */}

            <button className="loginButton" onClick={handleCustomLogin}>
              Login with Web3Auth
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4>Welcome To Moralis x Web3Auth!</h4>
          <button className="refresh" onClick={fetchBalance}>
            Refresh
          </button>
          <p className="subHeader">Details:</p>

          <div className="detailsDiv">
            <div>
              <h5>Account:</h5>
              <p>{user.attributes.accounts}</p>
            </div>
            <div>
              <h5>Balance (MATIC)</h5>
              <p>{balance} </p>
            </div>
          </div>

          <div className="footer">
            <input
              type={"text"}
              className="inputAddress"
              placeholder="0x... //to address"
              value={toAddress}
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
            />
            <button className="border-2 m-2" onClick={handleTransfer}>
              Test Transfer
            </button>
            <button className="border-2 m-2" onClick={donate}>
              Mint
            </button>
            <button className="border-2 m-2" onClick={test}>
              Akhil Tesr
            </button>
            <button className="border-2 m-2" onClick={test2}>
              Akhil Tesr2
            </button>
            <button className="border-2 m-2" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Web3Auth;
