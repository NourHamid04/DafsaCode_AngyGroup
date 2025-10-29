import React, { useState, useEffect } from "react";
import {
  add,
  maxDepth,
  findMax,
  minimize,
  minimizedTrie,
  trie,
  search,
} from "../Utils/trie-rec.js";
import Graphviz from "graphviz-react";
import { toDotString } from "../Utils/drawGraph.js";
import "./IndexPage.css"; 

const IndexPage = () => {
  const [language, setLanguage] = useState(["aa"]);
  const [graph, setGraph] = useState();
  const [minimizedGraph, setMinimizedGraph] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [graphKey, setGraphKey] = useState(0);  // Unique key to force re-render

  const handleSearch = () => {
    // Run the search to get the final node ID if the word is found
    const result = search(searchText);
    setSearchResult(result ? `The string "${searchText}" is found in the DAFSA.` : `The string "${searchText}" is NOT found in the DAFSA.`);
    
    const highlightedFinalState = result ? result : null;
  
    // Update both the normal and minimized graphs with the highlighted final state
    setGraph(toDotString(trie, highlightedFinalState));
    
    // Minimize the trie and update the minimized graph with the highlighted node
    minimize(trie);
    setMinimizedGraph(toDotString(minimizedTrie, highlightedFinalState));
  };

  const handleAddLanguage = () => {
    if (language.length === 0 || language.some((item) => item.trim() === "")) {
      alert("Please enter valid strings to add to the DAFSA.");
      return;
    }
    add(language);
    setGraph(toDotString(trie));
    findMax(language);
    maxDepth(trie.root);
  };

  const handleMinimize = (highlightedNode = null) => {
    if (!graph) {
      alert("Please create the DAFSA before attempting to minimize.");
      return;
    }
    
    // Minimize the trie and highlight the specified node
    minimize(trie);
    setMinimizedGraph(toDotString(minimizedTrie, highlightedNode));
  };
  return (
    <div>
      <h1>Deterministic Acyclic Finite State Automaton</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for a string"
        className="sin"
      />
      <button onClick={handleSearch}>Search DAFSA</button>
      {searchResult && <p>{searchResult}</p>}
      <h2>Enter your Language in the textbox below</h2>
      <input
        type="text"
        onChange={(e) => setLanguage(e.target.value.split(","))}
        placeholder="Input your string here example: aa"
      />
      <button onClick={handleAddLanguage}>Add to DAFSA</button>
      {graph && <Graphviz dot={graph} options={{ width: 600 }} key={graphKey} />}  {/* Unique key added */}
      <button onClick={handleMinimize}>Minimize</button>
      {minimizedGraph && <Graphviz dot={minimizedGraph} options={{ width: 600 }} />}
    </div>
  );
};

export default IndexPage;
