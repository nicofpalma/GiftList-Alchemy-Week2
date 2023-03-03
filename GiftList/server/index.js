const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'e3823949d873426965437a847aa8c6a34613431524e628d6e806e09e27360252';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  //const body = req.body;
  const {proof, name} = req.body;

  // TODO: prove that a name is in the list 
  //const isInTheList = false;

  let isInTheList = false;
  isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
