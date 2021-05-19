const cmd = require('node-cmd');

const Node = {};

Node.getPercentages = async function(node = ''){
  const percents = await cmd.runSync(`kubectl top node ${node}`);
  let percentObj = Parser.parse(percents.data);
  return await JSON.stringify(percentObj);
}

module.exports = Node