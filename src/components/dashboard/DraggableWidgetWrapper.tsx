import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Widget } from "../../types";

/**
 * Props for the draggable widget wrapper
 */
type Props = {
  widgets: Widget[];
};

/**
 * Draggable wrapper for dashboard widgets
 */
export default function DraggableWidgetWrapper({ widgets }: Props) {
  const [items, setItems] = useState<string[]>(widgets.map((w) => w.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((prev) => {
        const oldIndex = prev.indexOf(active.id.toString());
        const newIndex = prev.indexOf(over!.id.toString());
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div style={canvasStyle}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div style={wrapperContainerStyle}>
            {items.map((id) => {
              const widget = widgets.find((w) => w.id === id);
              if (!widget) return null;

              return (
                <SortableWidget key={widget.id} id={widget.id} title={widget.title}>
                  {widget.component}
                </SortableWidget>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

/**
 * Individual draggable widget with drag handle
 */
type SortableProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

function SortableWidget({ id, title, children }: SortableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...widgetWrapperStyle,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={dragHandleStyle}>
        <span style={{ marginRight: "0.5rem" }}>⠿</span>
        <span style={{ fontWeight: "bold" }}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

const canvasStyle: React.CSSProperties = {
  width: "100%",
  margin: "0 auto",
  minHeight: "100vh",
  padding: "2rem",
  // ❌ Verwijderen:
  // backgroundColor: "white",
  // backgroundImage: "radial-gradient(#ccc 1px, transparent 0)",
  // backgroundSize: "30px 30px",
};


const wrapperContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
};

const widgetWrapperStyle: React.CSSProperties = {
  backgroundColor: "#E7ECEF",
  border: "1px solid #131722",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(31,18,53,0.15)",
  display: "inline-block",
  padding: 0,
  maxWidth: "100%",
  minWidth: "400px",
  overflow: "auto",
  resize: "both",
};

const dragHandleStyle: React.CSSProperties = {
  cursor: "grab",
  padding: "0.5rem 1rem",
  backgroundColor: "#5885AF",
  color: "white",
  borderBottom: "1px solid #1F1235",
  fontSize: "1rem",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
};
