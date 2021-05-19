const cmd = require('node-cmd');

const Node = {};

Node.getPercentages = async function(node = ''){
  const percents = cmd.runSync(`kubectl top node ${node}`);
  let percentObj = Parser.parse(percents.data);
  percentObj = await JSON.stringify(percentObj);
  return percentObj;
}

module.exports = Node;