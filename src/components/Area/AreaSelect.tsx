"use client";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multi-select";
import { Area } from "@/lib/types";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const AreaSelect = ({
  areas,
  selectedAreas,
  setSelectedAreas,
}: {
  areas: Area[];
  selectedAreas: string[];
  setSelectedAreas: (value: string[]) => void;
}) => {
  return (
    <MultiSelector
      values={selectedAreas}
      onValuesChange={setSelectedAreas}
      loop={false}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select Areas" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {areas.map((option, i) => (
            <MultiSelectorItem key={i} value={option._id}>
              {option.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default AreaSelect;
