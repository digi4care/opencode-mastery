export type GapType =
  | "MISSING_BRANCH"
  | "WRONG_PRECONDITION"
  | "DEAD_END"
  | "MISSING_DATA_FLOW"
  | "UNREACHABLE_CODE";

export type GapSeverity = "critical" | "high" | "medium" | "low";

export type FlowNodeKind = "route" | "api" | "state" | "action" | "condition";

export interface FlowNode {
  id: string;
  kind: FlowNodeKind;
  label: string;
  sourceRef?: {
    path: string;
    line?: number;
  };
}

export interface FlowEdge {
  from: string;
  to: string;
  condition?: string;
  dataRequired?: string[];
}

export interface FlowDefinition {
  id: string;
  name: string;
  entryPoints: string[];
  exits: string[];
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface NodeTrace {
  nodeId: string;
  path?: string;
  line?: number;
  intendedPreconditions?: string[];
  actualPreconditions?: string[];
  postconditions?: string[];
}

export interface EdgeTrace {
  from: string;
  to: string;
  providedData?: string[];
}

export interface ImplementationTrace {
  flowId: string;
  nodeMappings: NodeTrace[];
  edgeMappings: EdgeTrace[];
  unresolvedNodes: string[];
}

export interface FlowGap {
  id: string;
  type: GapType;
  flowId: string;
  severity: GapSeverity;
  location?: {
    path: string;
    line?: number;
  };
  expected: string;
  actual: string;
  impact: string;
  fixHint: string;
}
