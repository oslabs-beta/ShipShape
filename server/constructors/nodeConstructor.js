const cmd = ('node-cmd');

const Node = {};

Node.getPercentages = async function(node = ''){
  const percents = await cmd.runSync(`kubectl top node ${node}`);
  return Parser.parse(percents.data);
}

module.exports = Node