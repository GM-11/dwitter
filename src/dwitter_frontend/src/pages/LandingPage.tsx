import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { Link } from "react-router-dom";
import {
  createActor,
  dwitter_backend,
} from "../../../declarations/dwitter_backend";

function LandingPage() {
  const [principal, setPrincipal] = React.useState("Not connected");

  async function loadIdentity() {
    let authClient = await AuthClient.create();
    await new Promise((resolve) => {
      authClient.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
        onSuccess: () => {
          resolve(null);
        },
      });
    });
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    let actor = createActor(process.env.CANISTER_ID_dwitter_backend, {
      agent,
    });

    whoAmI();
  }

  async function whoAmI() {
    const principal = await dwitter_backend.whoami();
    setPrincipal(principal.toString());
  }

  return (
    <div className="landingPage">
      <div>
        <h1>DWITTER</h1>
        <h2>Your decentralized dweet space</h2>
        {principal === "Not connected" ? (
          <button onClick={loadIdentity}>
            Connect your Internet Identity using ICP
          </button>
        ) : (
          <Link to="/home">
            <button>Home</button>
          </Link>
        )}
        <h2>Internet Identity: {principal}</h2>
      </div>
      <div>
        <h2>Fully anonymous</h2>
        <br />
        <h2>Fully decentralized</h2>
        <br />
        <h2>Fully secure</h2>
        <br />
        <h2>Get latest news</h2>
      </div>
    </div>
  );
}

export default LandingPage;
