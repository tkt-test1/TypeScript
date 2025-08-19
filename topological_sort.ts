/**
 * トポロジカルソート (Kahn's Algorithm)
 * 
 * 有向非巡回グラフ(DAG)におけるノードの依存関係を解決し、
 * 順序付きリストを返すアルゴリズム。
 */

type Graph = { [key: string]: string[] };

function topologicalSort(graph: Graph): string[] {
  const inDegree: { [key: string]: number } = {};
  const result: string[] = [];

  // 初期化
  for (const node in graph) {
    if (!inDegree[node]) inDegree[node] = 0;
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  // 入次数0のノードをキューに入れる
  const queue: string[] = Object.keys(inDegree).filter(node => inDegree[node] === 0);

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of graph[node] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // すべてのノードを処理できなければ、循環依存がある
  if (result.length !== Object.keys(inDegree).length) {
    throw new Error("Graph has at least one cycle!");
  }

  return result;
}

// ===== サンプル実行 =====
const graph: Graph = {
  "cook": ["eat"],
  "shop": ["cook"],
  "study": ["exam"],
  "sleep": [],
  "exam": [],
  "eat": []
};

console.log("Input graph:", graph);
console.log("Topological sort:", topologicalSort(graph));
