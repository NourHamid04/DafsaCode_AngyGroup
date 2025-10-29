export const toDotString = (trie, highlightedFinalState = null) => {
  let dotStr = "digraph fsm {\n";
  
  dotStr += "node [shape = point]; INITIAL_STATE;\n";
  dotStr += "node [shape = doublecircle, style=filled, fillcolor=black, fontcolor=white]; ";
  
  if (highlightedFinalState && trie.finalNodes.includes(highlightedFinalState)) {
    dotStr += `${highlightedFinalState} [fillcolor=red];\n`;
    const remainingFinalNodes = trie.finalNodes.filter(node => node !== highlightedFinalState);
    if (remainingFinalNodes.length > 0) {
      dotStr += remainingFinalNodes.join(", ") + ";\n";
    }
  } else {
    dotStr += trie.finalNodes.join(", ") + ";\n";
  }
  
  dotStr += "node [shape = circle, style=filled, fillcolor=white, fontcolor=black];\n";
  dotStr += "INITIAL_STATE -> root;\n";

  // Track unique transitions
  const transitionSet = new Set();
  for (const t of trie.transitions) {
    const transitionString = `${t.currentNode} -> ${t.nextNodes} [label="${t.character}"]`;
    if (!transitionSet.has(transitionString)) {
      dotStr += transitionString + ";\n";
      transitionSet.add(transitionString);
    }
  }

  dotStr += "}";  // Close the digraph
  return dotStr;
};
