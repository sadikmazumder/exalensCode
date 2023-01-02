/**
 
You're looking to move into a new apartment on specific street, and you're given a list of contiguous blocks on that street where
each block contains an apartment that you could move into.

You also have a list of requirements: a list of buildings that are important to you. For instance, you might value having a school and
a gym near your apartment. The list of blocks that you have contains information at every block about all of the buildings that are
present and absent at the block in question. For instance, for every block, you might know whether a school, a pool, an office, and a
gym are present.

In order to optimize your life, you want to pick an apartment block such that you minimize the farthest distance you'd have to walk
from your apartment to reach any of your required buildings.

Write a function that takes in a list of contiguous blocks on a specific street and a list of your required buildings and that returns
the location (the index) of the block that's most optimal for you.

If there are multiple most optimal blocks, your function can return the index of any one of them.

Sample Input
blocks = [
{
    "gym": false,
    "school": true,
    "store": false,
},
{
    "gym": true,
    "school": false,
    "store": false,
},
{
    "gym": true,
    "school": true,
    "store": false,
},
{
    "gym": false,
    "school": true,
    "store": false,
},
{
"gym": false,
"school": true,
"store": true,
}
]
reqs = ["gym", "school", "store"]

Sample Output
3 // at index 3, the farthest you'd have to walk to reach a gym, a school, or a store is 1 block; at any other index, you'd have to walk farther



*/

blocks = [
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: true,
    school: false,
    store: false,
  },
  {
    gym: true,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: true,
  },
];

reqs = ["gym", "school", "store"];

function apartmentHunting(blocks, reqs) {
  let minDistanceToRequiredBuilding = reqs.map((item) =>
    getMinDistancetoRequiredBuildings(item, blocks)
  );
  let maxDistanceToRequiredBuilding = getMaxDistanceToRequiredBuildings(
    minDistanceToRequiredBuilding,
    reqs,
    blocks
  );
  return maxDistanceToRequiredBuilding.indexOf(
    Math.min(...maxDistanceToRequiredBuilding)
  );
}

function getMinDistancetoRequiredBuildings(item, blocks) {
  // assuming all the bloks have no data buildings
  let minDistanceRequiredForRequiredBuilding = blocks.map((el) => Infinity);

  let currentClosest = Infinity;
  for (let i = 0; i < blocks.length; i++) {
    // iterate the complete block(blocks.length = 5)

    let currBlock = blocks[i]; // assigiining the i value to the cuttent block
    if (currBlock[item]) currentClosest = i; // from the block of elemnt er are fininf the elemnts "GYM"
    minDistanceRequiredForRequiredBuilding[i] = Math.abs(currentClosest - i); // set up the distance as " infinity 0 0 1 2
  }

  for (let j = blocks.length - 2; j >= 0; j--) {
    // here j value is 3
    let currBlock = blocks[j]; // current block is 4
    if (currBlock[item]) currentClosest = j;
    minDistanceRequiredForRequiredBuilding[j] = Math.min(
      minDistanceRequiredForRequiredBuilding[j],
      Math.abs(currentClosest - j)
    );
  }
  return minDistanceRequiredForRequiredBuilding;
}

function getMaxDistanceToRequiredBuildings(nestedArr, reqs, blocks) {
  let maxDistance = [];
  for (let i = 0; i < blocks.length; i++) {
    let currMaxDistance = -Infinity;
    for (let j = 0; j < nestedArr.length; j++) {
      currMaxDistance = Math.max(currMaxDistance, nestedArr[j][i]);
    }

    maxDistance[i] = currMaxDistance;
  }
  return maxDistance;
}

console.log(apartmentHunting(blocks, reqs));
// console.log(getMinDistancetoRequiredBuildings(item, blocks));
// console.log(getMaxDistanceToRequiredBuildings(nestedArr, reqs, blocks));
