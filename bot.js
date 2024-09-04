import WebSocket from 'ws';
// const WebSocket = require('ws');
const ws = new WebSocket('wss://pumpportal.fun/api/data');

ws.on('open', function open() {

    // Subscribing to token creation events
    let payload = {
        method: "subscribeNewToken", 
      }
    ws.send(JSON.stringify(payload));
  
    // Subscribing to trades made by accounts
    payload = {
        method: "subscribeAccountTrade",
        keys: [
            "4oaWU9trhrhCa6w4nqRXwcB6ECJ4gJEsFhnTrYXwDTg5",
            "CkcAZ3pWcMy6LPUtUmVHQgasoVkeQNQqWFcXDeXX6M9y",
            "5q7Xwc2T57sK1DKU6zuwVXvMPsxqB2xrJ3T5AonFYtcY",
            "GinWQtibd2sCALrNcHJe3iVUZ3dRQuvsmMBKcDhw3TX5",
            "En9RbqkkXcmKRGFZdLRik9sND8At7uuqLDwjrhAco6Gg",
            "HTVWL6GhnzFoT1wUHJF4AyD9SaAhAuTg8gdDaak8YVhe",
            "3sbnFJSSuhvpvNz5gyGWgbGm2a71kyfSiFzBMGQpvALB",
            "DbC8yQX7kSzRAa6BuMeEyLaDWBo6PfdAGqgwWrMkZywJ"
        ] // array of accounts to watch
      }
    ws.send(JSON.stringify(payload));
  
    // Subscribing to trades on tokens
    // payload = {
    //     method: "subscribeTokenTrade",
    //     keys: ["91WNez8D22NwBssQbkzjy4s2ipFrzpmn5hfvWVe2aY5p"] // array of token CAs to watch
    //   }
    // ws.send(JSON.stringify(payload));
  });
  
  ws.on('message', function message(data) {
    let result = JSON.parse(data);
    const time = new Date();
    if (result.txType === "create") {
        // console.log('if numero 1');
        if (result.marketCapSol > 50) {
            console.log('===TOKEN CREATED========GOOD ONE==========');
            console.log(`${time.getHours()}:${time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}`);  
            // console.log(result);
            const formattedObj = {
                contract: result.mint,
                tokenName: result.name,
                symbol: result.symbol,
                MarketCap: result.marketCapSol
            }
            console.table(formattedObj)
            console.log(`https://bullx.io/terminal?chainId=1399811149&address=${formattedObj.contract}`);
            console.log("==================================================================");
        }
      } else {
        if (result.mint) {
            const action = result.txType
            console.log(`=============== ${ action.toUpperCase() } ===============`);
            console.log(result);
            console.log('==================================================================');
        }
      }
  });

//   {
//     signature: '3Knp25RDEgA1a6NC12316R1ybTpmjNpodiG1RWeUiwN3pNyQMCyipLXi3wfdNaN91rLea3EkCRji8L5kmyAWfAdz',
//     mint: 'CF7sieKtpNvzjzAKEejLW2LpD1jzYxLNSHxHrBunpump',
//     traderPublicKey: 'FM1aFGMtyX7SC7CS9iSZex3kpTS9Q9HGSDmGJLmpZcAx',
//     txType: 'create',
//     initialBuy: 357666666.666666,
//     bondingCurveKey: '6D1Yzz2eAtMCVvf1bQDHiXv9badhAw2CxJKv8hg6fWBS',
//     vTokensInBondingCurve: 715333333.333334,
//     vSolInBondingCurve: 44.99999999999996,
//     marketCapSol: 62.90773532152831,
//     name: 'Mope',
//     symbol: 'MOPE',
//     uri: 'https://ipfs.io/ipfs/Qmc7yBDBDLacWDFssNj557eemoEnVKegyCrEK8smsLAR3M'
//   }

// =============== buy ===============
// {
//   signature: '5GEcB6Lso8C41GxDTTFxZdXFk2eoLPQD6s6UhHwjKVRCW2yT4cKaYo94aUspn2BnCz8XHeanKo9yTaLBm9W4NqWS',
//   mint: '9KqnvdPV4gqUoeC4J1t4Mi55c8EJbhcLiBbSiGwTeZzg',
//   traderPublicKey: 'En9RbqkkXcmKRGFZdLRik9sND8At7uuqLDwjrhAco6Gg',
//   txType: 'buy',
//   tokenAmount: 18641410.959215,
//   newTokenBalance: 18641410.959215,
//   bondingCurveKey: '5FBuk1AWEiPM8VFgeobJrkDr7X1qeTvvZC7XeviezZCR',
//   vTokensInBondingCurve: 755951768.460374,
//   vSolInBondingCurve: 42.58208174518922,
//   marketCapSol: 56.329098656538584
// }
