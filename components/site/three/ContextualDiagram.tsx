"use client";

import {
  HeroKnot,
  WireGlobe,
  StackedLattice,
  PodOrbit,
  CitationGraph,
  RingTunnel,
  GridLoad,
  SwitchFlow,
  RouteWeave,
  AirsideGrid,
  ItineraryMesh,
  OccupancyRing,
  CommunityLattice,
  BlockStack,
  SchemaScaffold,
  AgentMesh,
  CitationPulse,
  BrandSignalGraph,
  AgentLoop,
  VitalsMesh,
  CompoundCurve,
  PodAgents,
} from "./LineArt";

const MAP = {
  HeroKnot,
  WireGlobe,
  StackedLattice,
  PodOrbit,
  CitationGraph,
  RingTunnel,
  GridLoad,
  SwitchFlow,
  RouteWeave,
  AirsideGrid,
  ItineraryMesh,
  OccupancyRing,
  CommunityLattice,
  BlockStack,
  SchemaScaffold,
  AgentMesh,
  CitationPulse,
  BrandSignalGraph,
  AgentLoop,
  VitalsMesh,
  CompoundCurve,
  PodAgents,
} as const;

export type DiagramKey = keyof typeof MAP;

export function ContextualDiagram({ name }: { name?: string | null }) {
  const Comp = (name && (MAP as any)[name]) || RingTunnel;
  return <Comp />;
}
