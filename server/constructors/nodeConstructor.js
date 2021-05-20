const cmd = require('node-cmd');
const Parser = require('table-parser');
const Node = {};

Node.getPercentages = async function(node = ''){
  const percents = cmd.runSync(`kubectl top node ${node}`);
  let percentObj = Parser.parse(percents.data);
  console.log(percentObj);
  percentObj = await JSON.stringify(percentObj);
  return percentObj;
};

module.exports = Node;