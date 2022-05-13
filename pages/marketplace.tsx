import {
  ThirdwebNftMedia,
  useMarketplace,
  useActiveListings,
} from "@thirdweb-dev/react";
import React from "react";
import CodeSnippet from "../components/guide/CodeSnippet";
import codeSnippets from "../const/codeSnippets";
import contractAddresses from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

export default function Marketplace() {
  const marketplace = useMarketplace(contractAddresses[5].address);
  const { data: listings, isLoading } = useActiveListings(marketplace);

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>Marketplace</h1>
          <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

          <p>
            In a Marketplace you can sell or buy NFTs. Platforms like Opensea or
            Rarible are examples of marketplaces. thirdweb let&apos;s you create
            your own Marketplace.
          </p>
          <p>
            You can restrict the marketplace to sell only your NFTs, or make it
            an open marketplace; where any user can buy and sell!
          </p>

          <p>
            <a
              className={styles.lightPurple}
              href="https://portal.thirdweb.com/contracts/marketplace"
            >
              Check out the documentation here.
            </a>
          </p>
        </div>

        {!isLoading ? (
          <div className={styles.nftBoxGrid}>
            {listings?.map((listing) => (
              <div className={styles.nftBox} key={listing.id.toString()}>
                <ThirdwebNftMedia
                  metadata={{ ...listing.asset }}
                  className={styles.nftMedia}
                />
                <h3>{listing.asset.name}</h3>
                <p>
                  {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                  {listing.buyoutCurrencyValuePerToken.symbol}
                </p>
                <button
                  className={`${styles.mainButton} ${styles.spacerBottom}`}
                  onClick={() =>
                    marketplace?.direct.buyoutListing(listing.id, 1)
                  }
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      {/* Code Snippet */}
      <h2>How It Works</h2>

      <CodeSnippet text={codeSnippets.marketplace} />
    </div>
  );
}
