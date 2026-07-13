import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Type, ImageIcon, Layers, RotateCcw, RotateCw, Trash2, Copy,
  MoveUp, MoveDown, Eye, EyeOff, Lock, Unlock, Download,
  Save, ShoppingCart, Sparkles, Plus, AlignCenter,
  AlignLeft, AlignRight, Bold, Italic, Underline, FlipHorizontal,
  X, Check, Shirt, Grid3X3, Group, Ungroup, Move, Magnet
} from "lucide-react";
import { PRODUCTS, SHIRT_COLORS, formatPKR } from "../../data/products";
import { useApp } from "../../context/AppContext";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewSide = "front" | "back" | "left-sleeve" | "right-sleeve" | "pocket" | "collar" | "neck-label";

interface Layer {
  id: string;
  type: "text" | "image";
  name: string;
  side: ViewSide;
  x: number; y: number;
  width: number; height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
  groupId?: string;
  zIndex: number;
  // Text
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  bold?: boolean; italic?: boolean; underline?: boolean;
  align?: "left" | "center" | "right";
  letterSpacing?: number;
  lineHeight?: number;
  textShadow?: boolean;
  textOutline?: boolean;
  textOutlineColor?: string;
  // Image
  src?: string;
  flipH?: boolean; flipV?: boolean;
  originalName?: string;
}

type DragMode =
  | { mode: "idle" }
  | { mode: "move"; ids: string[]; startX: number; startY: number; origPositions: { id: string; x: number; y: number }[] }
  | { mode: "resize"; id: string; handle: string; startX: number; startY: number; origX: number; origY: number; origW: number; origH: number }
  | { mode: "rotate"; id: string; centerX: number; centerY: number; startAngle: number; origRotation: number };

// ─── Constants ────────────────────────────────────────────────────────────────
const PRINT_AREAS: Record<ViewSide, { left: string; top: string; width: string; height: string; label: string }> = {
  front: { left: "30%", top: "23%", width: "40%", height: "45%", label: "Front" },
  back: { left: "30%", top: "23%", width: "40%", height: "45%", label: "Back" },
  "left-sleeve": { left: "4%", top: "14%", width: "23%", height: "28%", label: "Left Sleeve" },
  "right-sleeve": { left: "73%", top: "14%", width: "23%", height: "28%", label: "Right Sleeve" },
  pocket: { left: "34%", top: "27%", width: "15%", height: "14%", label: "Pocket" },
  collar: { left: "32%", top: "7%", width: "36%", height: "9%", label: "Collar" },
  "neck-label": { left: "38%", top: "2%", width: "24%", height: "7%", label: "Neck Label" },
};

const ALL_VIEWS: ViewSide[] = ["front", "back", "left-sleeve", "right-sleeve", "pocket", "collar", "neck-label"];

const FONTS = ["Inter", "Poppins", "Arial", "Helvetica", "Georgia", "Impact", "Comic Sans MS", "Courier New",
  "Verdana", "Trebuchet MS", "Times New Roman", "Roboto", "Montserrat", "Open Sans", "Tahoma", "Palatino",
  "Garamond", "Futura", "Oswald", "Raleway"];

const RESIZE_HANDLES = [
  { id: "nw", style: { top: -5, left: -5 }, cursor: "nw-resize" },
  { id: "n",  style: { top: -5, left: "50%", transform: "translateX(-50%)" }, cursor: "n-resize" },
  { id: "ne", style: { top: -5, right: -5 }, cursor: "ne-resize" },
  { id: "e",  style: { top: "50%", right: -5, transform: "translateY(-50%)" }, cursor: "e-resize" },
  { id: "se", style: { bottom: -5, right: -5 }, cursor: "se-resize" },
  { id: "s",  style: { bottom: -5, left: "50%", transform: "translateX(-50%)" }, cursor: "s-resize" },
  { id: "sw", style: { bottom: -5, left: -5 }, cursor: "sw-resize" },
  { id: "w",  style: { top: "50%", left: -5, transform: "translateY(-50%)" }, cursor: "w-resize" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function applyResize(handle: string, dx: number, dy: number, oX: number, oY: number, oW: number, oH: number) {
  let x = oX, y = oY, w = oW, h = oH;
  if (handle.includes("e")) w = Math.max(20, oW + dx);
  if (handle.includes("w")) { x = oX + dx; w = Math.max(20, oW - dx); }
  if (handle.includes("s")) h = Math.max(20, oH + dy);
  if (handle.includes("n")) { y = oY + dy; h = Math.max(20, oH - dy); }
  return { x, y, width: w, height: h };
}

function snap(v: number, grid: number, enabled: boolean) {
  return enabled ? Math.round(v / grid) * grid : v;
}

let layerCounter = 0;
const newId = () => `layer-${Date.now()}-${++layerCounter}`;

// ─── Main Component ────────────────────────────────────────────────────────────
export function DesignerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showNotification } = useApp();
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

  // ── State ──
  const [shirtColor, setShirtColor] = useState(product.colors[0]);
  const [activeView, setActiveView] = useState<ViewSide>("front");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [history, setHistory] = useState<Layer[][]>([[]]);
  const [histIdx, setHistIdx] = useState(0);
  const [activePanel, setActivePanel] = useState<"layers" | "text" | "image" | "templates">("layers");
  const [textInput, setTextInput] = useState("Your Text");
  const [snapEnabled, setSnapEnabled] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [savedDesign, setSavedDesign] = useState(false);
  const [clipboard, setClipboard] = useState<Layer | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  // ── Refs ──
  const dragState = useRef<DragMode>({ mode: "idle" });
  const printAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const GRID_SIZE = 10;

  // ── Derived ──
  const selectedLayer = selectedIds.length === 1 ? layers.find((l) => l.id === selectedIds[0]) ?? null : null;
  const currentViewLayers = layers.filter((l) => l.side === activeView).sort((a, b) => a.zIndex - b.zIndex);

  // ── History ──
  const pushHistory = useCallback((newLayers: Layer[]) => {
    setHistory((prev) => {
      const slice = prev.slice(0, histIdx + 1);
      return [...slice, newLayers];
    });
    setHistIdx((i) => i + 1);
    setLayers(newLayers);
  }, [histIdx]);

  const undo = useCallback(() => {
    setHistIdx((i) => {
      const next = Math.max(0, i - 1);
      setLayers(history[next] ?? []);
      return next;
    });
  }, [history]);

  const redo = useCallback(() => {
    setHistIdx((i) => {
      const next = Math.min(history.length - 1, i + 1);
      setLayers(history[next] ?? []);
      return next;
    });
  }, [history]);

  // ── Layer manipulation ──
  const updateLayer = useCallback((id: string, updates: Partial<Layer>) => {
    const newLayers = layers.map((l) => l.id === id ? { ...l, ...updates } : l);
    pushHistory(newLayers);
  }, [layers, pushHistory]);

  const updateLayerImmediate = useCallback((id: string, updates: Partial<Layer>) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, ...updates } : l));
  }, []);

  const commitDrag = useCallback(() => {
    setLayers((current) => {
      pushHistory([...current]);
      return current;
    });
  }, [pushHistory]);

  const addLayer = useCallback((layer: Omit<Layer, "id" | "zIndex">) => {
    const maxZ = layers.reduce((m, l) => Math.max(m, l.zIndex), 0);
    const newLayer: Layer = { ...layer, id: newId(), zIndex: maxZ + 1 };
    const newLayers = [...layers, newLayer];
    pushHistory(newLayers);
    setSelectedIds([newLayer.id]);
    return newLayer;
  }, [layers, pushHistory]);

  const deleteSelected = useCallback(() => {
    pushHistory(layers.filter((l) => !selectedIds.includes(l.id)));
    setSelectedIds([]);
  }, [layers, selectedIds, pushHistory]);

  const duplicateSelected = useCallback(() => {
    const newLayers = [...layers];
    const added: string[] = [];
    const maxZ = layers.reduce((m, l) => Math.max(m, l.zIndex), 0);
    let zCounter = maxZ;
    selectedIds.forEach((id) => {
      const layer = layers.find((l) => l.id === id);
      if (!layer) return;
      const copy = { ...layer, id: newId(), x: layer.x + 12, y: layer.y + 12, zIndex: ++zCounter };
      newLayers.push(copy);
      added.push(copy.id);
    });
    pushHistory(newLayers);
    setSelectedIds(added);
  }, [layers, selectedIds, pushHistory]);

  const groupSelected = useCallback(() => {
    if (selectedIds.length < 2) return;
    const gid = `grp-${Date.now()}`;
    pushHistory(layers.map((l) => selectedIds.includes(l.id) ? { ...l, groupId: gid } : l));
    showNotification("Layers grouped", "success");
  }, [layers, selectedIds, pushHistory, showNotification]);

  const ungroupSelected = useCallback(() => {
    pushHistory(layers.map((l) => selectedIds.includes(l.id) ? { ...l, groupId: undefined } : l));
    showNotification("Layers ungrouped", "info");
  }, [layers, selectedIds, pushHistory, showNotification]);

  const moveLayerOrder = useCallback((id: string, dir: "up" | "down") => {
    const sorted = [...layers].sort((a, b) => a.zIndex - b.zIndex);
    const idx = sorted.findIndex((l) => l.id === id);
    if (dir === "up" && idx < sorted.length - 1) {
      const tmp = sorted[idx].zIndex;
      sorted[idx] = { ...sorted[idx], zIndex: sorted[idx + 1].zIndex };
      sorted[idx + 1] = { ...sorted[idx + 1], zIndex: tmp };
    } else if (dir === "down" && idx > 0) {
      const tmp = sorted[idx].zIndex;
      sorted[idx] = { ...sorted[idx], zIndex: sorted[idx - 1].zIndex };
      sorted[idx - 1] = { ...sorted[idx - 1], zIndex: tmp };
    }
    pushHistory(sorted);
  }, [layers, pushHistory]);

  const copySelected = useCallback(() => {
    if (!selectedLayer) return;
    setClipboard(selectedLayer);
    showNotification("Copied!", "info");
  }, [selectedLayer, showNotification]);

  const pasteClipboard = useCallback(() => {
    if (!clipboard) return;
    const maxZ = layers.reduce((m, l) => Math.max(m, l.zIndex), 0);
    const newL: Layer = { ...clipboard, id: newId(), x: clipboard.x + 15, y: clipboard.y + 15, side: activeView, zIndex: maxZ + 1 };
    pushHistory([...layers, newL]);
    setSelectedIds([newL.id]);
  }, [clipboard, layers, activeView, pushHistory]);

  // ── Drag Handlers ──
  const getPrintAreaCoords = useCallback((e: MouseEvent | React.MouseEvent) => {
    const rect = printAreaRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleLayerMouseDown = useCallback((e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    const layer = layers.find((l) => l.id === layerId);
    if (!layer || layer.locked) return;

    // Multi-select with shift
    if (e.shiftKey) {
      setSelectedIds((prev) => prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]);
    } else {
      if (!selectedIds.includes(layerId)) setSelectedIds([layerId]);
    }

    // If layer is in a group, also select all in group
    let idsToMove = selectedIds.includes(layerId) ? selectedIds : [layerId];
    if (layer.groupId) {
      const groupMembers = layers.filter((l) => l.groupId === layer.groupId).map((l) => l.id);
      idsToMove = Array.from(new Set([...idsToMove, ...groupMembers]));
    }

    const { x, y } = getPrintAreaCoords(e);
    dragState.current = {
      mode: "move",
      ids: idsToMove,
      startX: x,
      startY: y,
      origPositions: idsToMove.map((id) => {
        const l = layers.find((ll) => ll.id === id)!;
        return { id, x: l.x, y: l.y };
      }),
    };
  }, [layers, selectedIds, getPrintAreaCoords]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, layerId: string, handle: string) => {
    e.stopPropagation();
    const layer = layers.find((l) => l.id === layerId);
    if (!layer) return;
    const { x, y } = getPrintAreaCoords(e);
    dragState.current = {
      mode: "resize",
      id: layerId,
      handle,
      startX: x, startY: y,
      origX: layer.x, origY: layer.y,
      origW: layer.width, origH: layer.height,
    };
  }, [layers, getPrintAreaCoords]);

  const handleRotateMouseDown = useCallback((e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    const layer = layers.find((l) => l.id === layerId);
    if (!layer) return;
    const rect = printAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + layer.x + layer.width / 2;
    const centerY = rect.top + layer.y + layer.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    dragState.current = {
      mode: "rotate",
      id: layerId,
      centerX, centerY,
      startAngle,
      origRotation: layer.rotation,
    };
  }, [layers]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = dragState.current;
      if (drag.mode === "idle") return;

      if (drag.mode === "move") {
        const { x, y } = getPrintAreaCoords(e);
        const dx = x - drag.startX;
        const dy = y - drag.startY;
        setLayers((prev) => prev.map((l) => {
          const orig = drag.origPositions.find((o) => o.id === l.id);
          if (!orig) return l;
          return { ...l, x: snap(orig.x + dx, GRID_SIZE, snapEnabled), y: snap(orig.y + dy, GRID_SIZE, snapEnabled) };
        }));
      } else if (drag.mode === "resize") {
        const { x, y } = getPrintAreaCoords(e);
        const dx = x - drag.startX;
        const dy = y - drag.startY;
        const result = applyResize(drag.handle, dx, dy, drag.origX, drag.origY, drag.origW, drag.origH);
        setLayers((prev) => prev.map((l) => l.id === drag.id ? { ...l, ...result } : l));
      } else if (drag.mode === "rotate") {
        const angle = Math.atan2(e.clientY - drag.centerY, e.clientX - drag.centerX) * (180 / Math.PI);
        const delta = angle - drag.startAngle;
        let newRot = drag.origRotation + delta;
        if (snapEnabled) newRot = Math.round(newRot / 15) * 15; // snap to 15° steps
        setLayers((prev) => prev.map((l) => l.id === drag.id ? { ...l, rotation: newRot } : l));
      }
    };

    const onUp = () => {
      if (dragState.current.mode !== "idle") {
        dragState.current = { mode: "idle" };
        // Commit to history after drag
        setLayers((curr) => {
          setHistory((h) => {
            const slice = h.slice(0, histIdx + 1);
            return [...slice, curr];
          });
          setHistIdx((i) => i + 1);
          return curr;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [getPrintAreaCoords, snapEnabled, histIdx]);

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "z": e.shiftKey ? redo() : undo(); e.preventDefault(); break;
          case "c": copySelected(); e.preventDefault(); break;
          case "v": pasteClipboard(); e.preventDefault(); break;
          case "d": duplicateSelected(); e.preventDefault(); break;
          case "a": setSelectedIds(currentViewLayers.map((l) => l.id)); e.preventDefault(); break;
          case "g": e.shiftKey ? ungroupSelected() : groupSelected(); e.preventDefault(); break;
        }
      } else {
        if (e.key === "Delete" || e.key === "Backspace") { deleteSelected(); e.preventDefault(); }
        if (e.key === "Escape") setSelectedIds([]);
        // Arrow keys for nudge
        if (selectedIds.length > 0 && ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) {
          const step = e.shiftKey ? 10 : 1;
          const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
          const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
          const newLayers = layers.map((l) => selectedIds.includes(l.id) ? { ...l, x: l.x + dx, y: l.y + dy } : l);
          pushHistory(newLayers);
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, copySelected, pasteClipboard, duplicateSelected, deleteSelected, groupSelected, ungroupSelected, selectedIds, layers, currentViewLayers, pushHistory]);

  // ── Add layers ──
  const addTextLayer = useCallback(() => {
    if (!textInput.trim()) return;
    addLayer({
      type: "text", name: `Text ${layers.length + 1}`, side: activeView,
      x: 20, y: 20, width: 150, height: 50, rotation: 0, opacity: 1,
      visible: true, locked: false,
      text: textInput, fontFamily: "Poppins", fontSize: 28, fontColor: "#ffffff",
      bold: false, italic: false, underline: false, align: "left",
      letterSpacing: 0, lineHeight: 1.2,
    });
    setActivePanel("layers");
  }, [textInput, layers.length, activeView, addLayer]);

  const addImageFromUpload = useCallback((src: string, name: string) => {
    addLayer({
      type: "image", name, side: activeView,
      x: 20, y: 20, width: 100, height: 100, rotation: 0, opacity: 1,
      visible: true, locked: false, src, originalName: name,
    });
    setActivePanel("layers");
  }, [activeView, addLayer]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) { showNotification(`${file.name}: Max 5MB`, "error"); return; }
      const reader = new FileReader();
      reader.onload = (ev) => addImageFromUpload(ev.target?.result as string, file.name.replace(/\.[^.]+$/, ""));
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  // ── Export ──
  const exportSideToPNG = async (side: ViewSide, transparent = false): Promise<string> => {
    const SCALE = 3;
    const W = 400 * SCALE, H = 440 * SCALE;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    if (!transparent) {
      ctx.fillStyle = shirtColor;
      ctx.fillRect(0, 0, W, H);
    }

    const area = PRINT_AREAS[side];
    const pX = parseFloat(area.left) / 100 * W;
    const pY = parseFloat(area.top) / 100 * H;
    const pW = parseFloat(area.width) / 100 * W;
    const pH = parseFloat(area.height) / 100 * H;

    const sideLayers = layers.filter((l) => l.side === side && l.visible).sort((a, b) => a.zIndex - b.zIndex);

    for (const layer of sideLayers) {
      ctx.save();
      ctx.globalAlpha = layer.opacity;
      const absX = pX + (layer.x / 100) * pW;
      const absY = pY + (layer.y / 100) * pH;
      const absW = (layer.width / 100) * pW;
      const absH = (layer.height / 100) * pH;
      const cx = absX + absW / 2, cy = absY + absH / 2;
      ctx.translate(cx, cy);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      ctx.translate(-cx, -cy);

      if (layer.type === "text") {
        const fs = (layer.fontSize ?? 24) * SCALE * 0.3;
        ctx.font = `${layer.bold ? "bold " : ""}${layer.italic ? "italic " : ""}${fs}px ${layer.fontFamily ?? "Inter"}`;
        ctx.fillStyle = layer.fontColor ?? "#ffffff";
        ctx.textAlign = (layer.align as CanvasTextAlign) ?? "left";
        ctx.globalAlpha *= layer.opacity;
        if (layer.flipH) { ctx.scale(-1, 1); ctx.translate(-absX * 2 - absW, 0); }
        ctx.fillText(layer.text ?? "", absX, absY + fs);
      } else if (layer.type === "image" && layer.src) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(); img.src = layer.src!; });
          if (layer.flipH) { ctx.scale(-1, 1); ctx.translate(-absX * 2 - absW, 0); }
          if (layer.flipV) { ctx.scale(1, -1); ctx.translate(0, -absY * 2 - absH); }
          ctx.drawImage(img, absX, absY, absW, absH);
        } catch (_) { /* skip cross-origin images */ }
      }
      ctx.restore();
    }

    return canvas.toDataURL(transparent ? "image/png" : "image/jpeg", 0.95);
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  const generateMetadata = (side: ViewSide) => {
    const sideLayers = layers.filter((l) => l.side === side);
    const area = PRINT_AREAS[side];
    return {
      side: PRINT_AREAS[side].label,
      printArea: area,
      totalLayers: sideLayers.length,
      textLayers: sideLayers.filter((l) => l.type === "text").length,
      imageLayers: sideLayers.filter((l) => l.type === "image").length,
      fonts: [...new Set(sideLayers.filter((l) => l.type === "text").map((l) => l.fontFamily))],
      colors: [...new Set(sideLayers.filter((l) => l.type === "text").map((l) => l.fontColor))],
      shirtColor,
      layers: sideLayers.map((l) => ({
        id: l.id, name: l.name, type: l.type,
        position: { x: Math.round(l.x), y: Math.round(l.y) },
        size: { width: Math.round(l.width), height: Math.round(l.height) },
        rotation: Math.round(l.rotation * 10) / 10,
        opacity: l.opacity,
        locked: l.locked,
        visible: l.visible,
        ...(l.type === "text" ? {
          text: l.text, font: l.fontFamily, fontSize: l.fontSize, color: l.fontColor,
          bold: l.bold, italic: l.italic, underline: l.underline, align: l.align,
          letterSpacing: l.letterSpacing, lineHeight: l.lineHeight,
        } : {
          imageName: l.originalName ?? l.name, flipH: l.flipH, flipV: l.flipV,
        }),
      })),
    };
  };

  const handleExportAll = async () => {
    setExportLoading(true);
    try {
      // Download front PNG
      const frontPng = await exportSideToPNG("front");
      downloadFile(frontPng, `Zumrah_Front_${Date.now()}.jpg`);
      await new Promise(r => setTimeout(r, 300));

      // Download back PNG
      const backPng = await exportSideToPNG("back");
      downloadFile(backPng, `Zumrah_Back_${Date.now()}.jpg`);
      await new Promise(r => setTimeout(r, 300));

      // Download transparent
      const transPng = await exportSideToPNG(activeView, true);
      downloadFile(transPng, `Zumrah_Transparent_${Date.now()}.png`);
      await new Promise(r => setTimeout(r, 300));

      // Download metadata JSON
      const metadata = {
        product: { id: product.id, name: product.name, sku: product.sku },
        shirtColor,
        generatedAt: new Date().toISOString(),
        sides: ALL_VIEWS.map((s) => generateMetadata(s)),
      };
      const json = JSON.stringify(metadata, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      downloadFile(URL.createObjectURL(blob), `Zumrah_Design_Metadata_${Date.now()}.json`);

      showNotification("All files downloaded!", "success");
    } catch (err) {
      showNotification("Export error. Please try again.", "error");
    }
    setExportLoading(false);
  };

  // ── Shirt SVG ──
  const ShirtSVG = ({ color, view }: { color: string; view: ViewSide }) => (
    <svg viewBox="0 0 400 440" className="w-full h-full pointer-events-none select-none" aria-hidden>
      <defs>
        <filter id="drop-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.5" />
        </filter>
        <linearGradient id="shirt-shading" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      </defs>

      {(view === "front" || view === "back" || view === "pocket" || view === "collar" || view === "neck-label") && (
        <>
          <path d="M 147,35 C 136,35 112,48 97,66 L 22,108 L 16,130 L 78,156 L 78,395 L 322,395 L 322,156 L 384,130 L 378,108 L 303,66 C 288,48 264,35 253,35 C 246,58 224,74 200,74 C 176,74 154,58 147,35 Z"
            fill={color} filter="url(#drop-shadow)" />
          <path d="M 147,35 C 162,68 180,78 200,78 C 220,78 238,68 253,35"
            fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          {/* Collar highlight */}
          <path d="M 147,35 C 162,68 180,78 200,78 C 220,78 238,68 253,35"
            fill="rgba(255,255,255,0.06)" />
          {/* Shirt overlay shading */}
          <path d="M 147,35 C 136,35 112,48 97,66 L 22,108 L 16,130 L 78,156 L 78,395 L 322,395 L 322,156 L 384,130 L 378,108 L 303,66 C 288,48 264,35 253,35 C 246,58 224,74 200,74 C 176,74 154,58 147,35 Z"
            fill="url(#shirt-shading)" />
        </>
      )}

      {view === "left-sleeve" && (
        <path d="M 220,35 L 147,35 C 136,35 112,48 97,66 L 22,108 L 16,130 L 78,156 L 78,220 L 220,220 Z"
          fill={color} filter="url(#drop-shadow)" />
      )}
      {view === "right-sleeve" && (
        <path d="M 180,35 L 253,35 C 264,35 288,48 303,66 L 378,108 L 384,130 L 322,156 L 322,220 L 180,220 Z"
          fill={color} filter="url(#drop-shadow)" />
      )}

      {/* Print area boundaries */}
      {(() => {
        const area = PRINT_AREAS[view];
        const x = parseFloat(area.left) / 100 * 400;
        const y = parseFloat(area.top) / 100 * 440;
        const w = parseFloat(area.width) / 100 * 400;
        const h = parseFloat(area.height) / 100 * 440;
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill="rgba(212,175,55,0.05)" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" strokeDasharray="6,4" rx="3" />
            <text x={x + w / 2} y={y - 6} textAnchor="middle" fill="rgba(212,175,55,0.6)" fontSize="10" fontFamily="Inter">
              {area.label} Print Area
            </text>
          </>
        );
      })()}
    </svg>
  );

  // ── Layer Element (DOM-based) ──
  const LayerElement = ({ layer }: { layer: Layer }) => {
    const isSelected = selectedIds.includes(layer.id);
    const isMulti = selectedIds.length > 1 && isSelected;

    return (
      <div
        key={layer.id}
        data-layer-id={layer.id}
        onMouseDown={(e) => handleLayerMouseDown(e, layer.id)}
        style={{
          position: "absolute",
          left: layer.x,
          top: layer.y,
          width: layer.width,
          height: layer.type === "text" ? "auto" : layer.height,
          transform: `rotate(${layer.rotation}deg)`,
          transformOrigin: "center center",
          opacity: layer.opacity,
          visibility: layer.visible ? "visible" : "hidden",
          cursor: layer.locked ? "not-allowed" : "move",
          userSelect: "none",
          zIndex: layer.zIndex,
          pointerEvents: "all",
        }}
      >
        {/* Layer content */}
        {layer.type === "text" && (
          <div style={{
            fontFamily: layer.fontFamily ?? "Inter",
            fontSize: layer.fontSize ?? 24,
            color: layer.fontColor ?? "#ffffff",
            fontWeight: layer.bold ? "bold" : "normal",
            fontStyle: layer.italic ? "italic" : "normal",
            textDecoration: layer.underline ? "underline" : "none",
            textAlign: layer.align ?? "left",
            letterSpacing: layer.letterSpacing ?? 0,
            lineHeight: layer.lineHeight ?? 1.2,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textShadow: layer.textShadow ? "2px 2px 4px rgba(0,0,0,0.8)" : "none",
            WebkitTextStroke: layer.textOutline ? `1px ${layer.textOutlineColor ?? "#000"}` : "none",
            transform: `scaleX(${layer.flipH ? -1 : 1})`,
            minWidth: 40,
            pointerEvents: "none",
          }}>
            {layer.text}
          </div>
        )}
        {layer.type === "image" && layer.src && (
          <img
            src={layer.src}
            alt={layer.name}
            draggable={false}
            style={{
              width: "100%", height: "100%", objectFit: "fill",
              transform: `scaleX(${layer.flipH ? -1 : 1}) scaleY(${layer.flipV ? -1 : 1})`,
              display: "block", pointerEvents: "none",
            }}
          />
        )}

        {/* Selection overlay */}
        {isSelected && (
          <div style={{
            position: "absolute",
            inset: -2,
            border: `2px dashed #D4AF37`,
            borderRadius: 3,
            pointerEvents: "none",
          }} />
        )}

        {/* Resize handles (only single selection) */}
        {isSelected && !isMulti && !layer.locked && (
          <>
            {/* Rotation handle */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleRotateMouseDown(e, layer.id); }}
              style={{
                position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
                width: 14, height: 14, background: "#D4AF37", border: "2px solid white",
                borderRadius: "50%", cursor: "grab", zIndex: 100, pointerEvents: "all",
              }}
            />
            {/* Rotation line */}
            <div style={{
              position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
              width: 2, height: 14, background: "rgba(212,175,55,0.6)", pointerEvents: "none",
            }} />

            {/* 8 resize handles */}
            {RESIZE_HANDLES.map((h) => (
              <div
                key={h.id}
                onMouseDown={(e) => { e.stopPropagation(); handleResizeMouseDown(e, layer.id, h.id); }}
                style={{
                  position: "absolute",
                  ...h.style,
                  width: 10, height: 10,
                  background: "white", border: "2px solid #D4AF37",
                  borderRadius: 2, cursor: h.cursor,
                  zIndex: 100, pointerEvents: "all",
                }}
              />
            ))}
          </>
        )}

        {/* Locked indicator */}
        {layer.locked && isSelected && (
          <div style={{ position: "absolute", top: -16, right: 0, fontSize: 10, color: "#D4AF37" }}>🔒</div>
        )}
      </div>
    );
  };

  const currentArea = PRINT_AREAS[activeView];

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden select-none" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Top Toolbar ── */}
      <div className="h-12 bg-[#0d0d0d] border-b border-[#1a1a1a] flex items-center justify-between px-3 flex-shrink-0 gap-2 z-10">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 mr-2 flex-shrink-0">
            <div className="w-7 h-7 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Shirt size={14} className="text-black" />
            </div>
            <span className="text-white font-bold text-sm hidden md:block" style={{ fontFamily: "Poppins, sans-serif" }}>Design Studio</span>
          </Link>

          {/* Undo / Redo */}
          <button onClick={undo} disabled={histIdx === 0} title="Undo (Ctrl+Z)" className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded transition-colors">
            <RotateCcw size={15} />
          </button>
          <button onClick={redo} disabled={histIdx >= history.length - 1} title="Redo (Ctrl+Shift+Z)" className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded transition-colors">
            <RotateCw size={15} />
          </button>

          <div className="w-px h-5 bg-[#333]" />

          {/* View tabs */}
          <div className="hidden lg:flex items-center gap-0.5 bg-[#111] border border-[#222] rounded-xl p-1 overflow-x-auto max-w-sm">
            {ALL_VIEWS.map((v) => {
              const hasLayers = layers.some((l) => l.side === v);
              return (
                <button
                  key={v}
                  onClick={() => setActiveView(v)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap flex items-center gap-1 ${activeView === v ? "bg-[#D4AF37] text-black" : "text-gray-400 hover:text-gray-200"}`}
                >
                  {PRINT_AREAS[v].label}
                  {hasLayers && <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-70" />}
                </button>
              );
            })}
          </div>

          <div className="w-px h-5 bg-[#333]" />

          {/* Snap & Grid */}
          <button
            onClick={() => setSnapEnabled(!snapEnabled)}
            title="Toggle Snap"
            className={`p-1.5 rounded transition-colors ${snapEnabled ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-gray-500 hover:text-white"}`}
          >
            <Magnet size={15} />
          </button>
          <button
            onClick={() => setGridVisible(!gridVisible)}
            title="Toggle Grid"
            className={`p-1.5 rounded transition-colors ${gridVisible ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-gray-500 hover:text-white"}`}
          >
            <Grid3X3 size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Group / Ungroup */}
          {selectedIds.length > 1 && (
            <button onClick={groupSelected} className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 transition-all">
              <Group size={12} /> Group
            </button>
          )}
          {selectedLayer?.groupId && (
            <button onClick={ungroupSelected} className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 transition-all">
              <Ungroup size={12} /> Ungroup
            </button>
          )}

          <button
            onClick={handleExportAll}
            disabled={exportLoading}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 transition-all"
          >
            <Download size={13} /> {exportLoading ? "Exporting..." : "Export All"}
          </button>

          <button
            onClick={() => { setSavedDesign(true); showNotification("Design saved!", "success"); }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 transition-all"
          >
            <Save size={13} /> Save
          </button>

          <button
            onClick={() => {
              addToCart({ product, quantity: 1, selectedColor: shirtColor, selectedColorName: SHIRT_COLORS.find((c) => c.hex === shirtColor)?.name ?? shirtColor, selectedSize: "M", customized: true });
              setSavedDesign(true);
              setTimeout(() => navigate("/cart"), 1000);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-bold hover:bg-[#C49B2A] transition-all"
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* ── Left Panel ── */}
        <div className="w-56 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col flex-shrink-0 overflow-hidden">
          {/* Panel tabs */}
          <div className="flex border-b border-[#1a1a1a] flex-shrink-0">
            {([
              { id: "layers", icon: Layers, label: "Layers" },
              { id: "text", icon: Type, label: "Text" },
              { id: "image", icon: ImageIcon, label: "Image" },
              { id: "templates", icon: Sparkles, label: "Templates" },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActivePanel(id)}
                className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 text-[9px] transition-colors ${activePanel === id ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-600 hover:text-gray-400"}`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-3 min-h-0">
            {/* Shirt Color */}
            <div>
              <p className="text-gray-600 text-[9px] uppercase tracking-wider mb-1.5">Shirt Color</p>
              <div className="flex flex-wrap gap-1.5">
                {SHIRT_COLORS.map((c) => (
                  <button key={c.hex} title={c.name} onClick={() => setShirtColor(c.hex)}
                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${shirtColor === c.hex ? "border-[#D4AF37] scale-110 shadow-[0_0_6px_rgba(212,175,55,0.7)]" : "border-[#333]"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Panel content */}
            {activePanel === "layers" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-gray-600 text-[9px] uppercase tracking-wider">Layers ({currentViewLayers.length})</p>
                  <div className="flex gap-1">
                    {selectedIds.length > 0 && (
                      <>
                        <button onClick={duplicateSelected} title="Duplicate (Ctrl+D)" className="p-0.5 text-gray-600 hover:text-[#D4AF37]"><Copy size={10} /></button>
                        <button onClick={deleteSelected} title="Delete" className="p-0.5 text-gray-600 hover:text-red-400"><Trash2 size={10} /></button>
                      </>
                    )}
                  </div>
                </div>
                {currentViewLayers.length === 0 ? (
                  <div className="text-center py-6">
                    <Layers size={28} className="text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-700 text-[10px]">No layers. Add text or images.</p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {[...currentViewLayers].reverse().map((layer) => (
                      <div
                        key={layer.id}
                        onClick={(e) => {
                          if (e.shiftKey) {
                            setSelectedIds((prev) => prev.includes(layer.id) ? prev.filter((id) => id !== layer.id) : [...prev, layer.id]);
                          } else {
                            setSelectedIds([layer.id]);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${selectedIds.includes(layer.id) ? "bg-[#D4AF37]/15 border border-[#D4AF37]/40" : "hover:bg-[#111] border border-transparent"}`}
                      >
                        <div className="w-5 h-5 rounded bg-[#1a1a1a] flex items-center justify-center text-gray-500 flex-shrink-0">
                          {layer.type === "text" ? <Type size={9} /> : <ImageIcon size={9} />}
                        </div>
                        <span className="text-[10px] text-gray-300 flex-1 truncate">{layer.name}</span>
                        {layer.groupId && <span className="text-[8px] text-purple-400">G</span>}
                        <button onClick={(e) => { e.stopPropagation(); updateLayer(layer.id, { visible: !layer.visible }); }}
                          className="p-0.5 text-gray-700 hover:text-gray-300 flex-shrink-0">
                          {layer.visible ? <Eye size={10} /> : <EyeOff size={10} />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); updateLayer(layer.id, { locked: !layer.locked }); }}
                          className="p-0.5 text-gray-700 hover:text-gray-300 flex-shrink-0">
                          {layer.locked ? <Lock size={10} /> : <Unlock size={10} />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activePanel === "text" && (
              <div className="space-y-2.5">
                <p className="text-gray-600 text-[9px] uppercase tracking-wider">Add Text Layer</p>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none focus:border-[#D4AF37]/50 resize-none"
                  rows={2}
                  placeholder="Your text..."
                />
                <button onClick={addTextLayer}
                  className="w-full py-2 bg-[#D4AF37] text-black rounded-lg text-xs font-bold hover:bg-[#C49B2A] transition-colors flex items-center justify-center gap-1.5">
                  <Type size={12} /> Add Text Layer
                </button>
                <div className="space-y-1 pt-2 border-t border-[#1a1a1a]">
                  <p className="text-gray-600 text-[9px] mb-1">Quick Presets</p>
                  {["BRAND NAME", "Team 2026", "Custom Quote", "LOGO TEXT", "Event Name", "Player #10"].map((t) => (
                    <button key={t} onClick={() => { setTextInput(t); }}
                      className="w-full py-1.5 px-2 bg-[#111] border border-[#333] text-gray-400 rounded text-[10px] text-left hover:border-[#D4AF37]/50 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activePanel === "image" && (
              <div className="space-y-2.5">
                <p className="text-gray-600 text-[9px] uppercase tracking-wider">Upload Images</p>
                <label className="block">
                  <div className="border-2 border-dashed border-[#333] hover:border-[#D4AF37]/50 rounded-xl p-5 text-center cursor-pointer transition-all hover:bg-[#D4AF37]/5">
                    <ImageIcon size={24} className="text-gray-600 mx-auto mb-1.5" />
                    <p className="text-gray-400 text-[10px] font-medium">Click to Upload</p>
                    <p className="text-gray-600 text-[9px]">PNG, JPG, WEBP, GIF · Max 5MB each · Multiple files OK</p>
                  </div>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                </label>
                <div className="pt-1 border-t border-[#1a1a1a]">
                  <p className="text-gray-600 text-[9px] mb-2">Quick Elements</p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["⭐", "🔥", "🏆", "💎", "🦁", "⚡", "🎯", "🌟"].map((emoji) => (
                      <button key={emoji}
                        onClick={() => {
                          const c = document.createElement("canvas");
                          c.width = 80; c.height = 80;
                          const ctx = c.getContext("2d")!;
                          ctx.font = "64px serif"; ctx.textAlign = "center";
                          ctx.fillText(emoji, 40, 70);
                          addImageFromUpload(c.toDataURL(), emoji);
                        }}
                        className="aspect-square bg-[#111] border border-[#333] rounded-lg text-xl hover:border-[#D4AF37]/50 flex items-center justify-center transition-all"
                      >{emoji}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePanel === "templates" && (
              <div className="space-y-1.5">
                <p className="text-gray-600 text-[9px] uppercase tracking-wider mb-2">Quick Start Templates</p>
                {[
                  { name: "Minimal Logo", layers: [{ type: "text" as const, text: "BRAND", fontSize: 32, fontColor: "#ffffff", bold: true, fontFamily: "Impact" }] },
                  { name: "Sports Team", layers: [{ type: "text" as const, text: "TEAM", fontSize: 36, fontColor: "#D4AF37", bold: true, fontFamily: "Impact" }, { type: "text" as const, text: "#10", fontSize: 48, fontColor: "#ffffff", bold: true, fontFamily: "Poppins" }] },
                  { name: "Corporate", layers: [{ type: "text" as const, text: "Company Name", fontSize: 22, fontColor: "#ffffff", bold: false, fontFamily: "Inter" }] },
                  { name: "Event", layers: [{ type: "text" as const, text: "Event 2026", fontSize: 28, fontColor: "#D4AF37", bold: true, fontFamily: "Poppins" }] },
                ].map((tmpl) => (
                  <button
                    key={tmpl.name}
                    onClick={() => {
                      let yOffset = 20;
                      tmpl.layers.forEach((l) => {
                        addLayer({ type: l.type, name: l.text ?? "Layer", side: activeView, x: 30, y: yOffset, width: 150, height: 50, rotation: 0, opacity: 1, visible: true, locked: false, ...l, zIndex: 0 });
                        yOffset += 60;
                      });
                    }}
                    className="w-full py-2.5 px-3 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-[10px] text-left hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all flex items-center justify-between"
                  >
                    {tmpl.name}
                    <Plus size={11} className="text-[#D4AF37]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Center Canvas ── */}
        <div ref={containerRef} className="flex-1 bg-[#080808] flex items-center justify-center overflow-hidden relative">
          {/* Grid overlay */}
          {gridVisible && (
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
              backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`
            }} />
          )}

          {/* Shirt container */}
          <div
            className="relative"
            style={{
              width: `min(calc(100% - 32px), calc((100vh - 48px) * 0.91))`,
              aspectRatio: "400/440",
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            {/* Shirt SVG background */}
            <div className="absolute inset-0">
              <ShirtSVG color={shirtColor} view={activeView} />
            </div>

            {/* Print area interactive layer */}
            <div
              ref={printAreaRef}
              onMouseDown={(e) => {
                if (e.target === printAreaRef.current) setSelectedIds([]);
              }}
              style={{
                position: "absolute",
                left: currentArea.left,
                top: currentArea.top,
                width: currentArea.width,
                height: currentArea.height,
                cursor: "default",
                overflow: "visible",
              }}
            >
              {currentViewLayers.map((layer) => (
                <LayerElement key={layer.id} layer={layer} />
              ))}
            </div>
          </div>

          {/* Layer count badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="bg-[#111]/90 backdrop-blur-sm border border-[#333] rounded-full px-4 py-1.5 text-xs text-gray-400">
              {PRINT_AREAS[activeView].label} · {currentViewLayers.length} layer{currentViewLayers.length !== 1 ? "s" : ""}
              {selectedIds.length > 0 && ` · ${selectedIds.length} selected`}
            </div>
          </div>

          {/* Mobile view switcher */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1 bg-[#111]/90 backdrop-blur-sm border border-[#333] rounded-xl p-1 lg:hidden overflow-x-auto max-w-xs">
            {ALL_VIEWS.slice(0, 4).map((v) => (
              <button key={v} onClick={() => setActiveView(v)}
                className={`px-2 py-1 rounded-lg text-[9px] whitespace-nowrap transition-all ${activeView === v ? "bg-[#D4AF37] text-black font-bold" : "text-gray-400"}`}>
                {PRINT_AREAS[v].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Properties Panel ── */}
        <div className="w-60 bg-[#0d0d0d] border-l border-[#1a1a1a] flex flex-col flex-shrink-0 overflow-hidden">
          <div className="p-3 border-b border-[#1a1a1a] flex-shrink-0">
            <h3 className="text-white text-xs font-semibold">Properties</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4 min-h-0">
            {selectedIds.length === 0 ? (
              <div className="text-center py-10">
                <Move size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-600 text-[10px] leading-relaxed">Select a layer to edit.<br />Shift+click for multi-select.<br />Ctrl+A for select all.</p>
              </div>
            ) : selectedIds.length > 1 ? (
              <div>
                <p className="text-[#D4AF37] text-xs font-semibold mb-3">{selectedIds.length} layers selected</p>
                <div className="space-y-2">
                  <button onClick={groupSelected} className="w-full py-2 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 flex items-center justify-center gap-2">
                    <Group size={13} /> Group Selected
                  </button>
                  <button onClick={duplicateSelected} className="w-full py-2 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50 flex items-center justify-center gap-2">
                    <Copy size={13} /> Duplicate All
                  </button>
                  <button onClick={deleteSelected} className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs flex items-center justify-center gap-2">
                    <Trash2 size={13} /> Delete All
                  </button>
                </div>
              </div>
            ) : selectedLayer && (
              <>
                {/* Layer name */}
                <div>
                  <PropLabel>Name</PropLabel>
                  <input value={selectedLayer.name}
                    onChange={(e) => updateLayer(selectedLayer.id, { name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none focus:border-[#D4AF37]/50"
                  />
                </div>

                {/* Position & Size */}
                <div>
                  <PropLabel>Position & Size (px)</PropLabel>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: "X", key: "x" as keyof Layer },
                      { label: "Y", key: "y" as keyof Layer },
                      { label: "W", key: "width" as keyof Layer },
                      { label: "H", key: "height" as keyof Layer },
                    ].map(({ label, key }) => (
                      <div key={label}>
                        <p className="text-gray-600 text-[9px] mb-0.5">{label}</p>
                        <input
                          type="number"
                          value={Math.round(Number(selectedLayer[key]))}
                          onChange={(e) => updateLayer(selectedLayer.id, { [key]: Number(e.target.value) })}
                          className="w-full px-2 py-1 bg-[#111] border border-[#333] rounded-lg text-white text-[10px] outline-none focus:border-[#D4AF37]/50 text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rotation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <PropLabel>Rotation</PropLabel>
                    <span className="text-[#D4AF37] text-[9px]">{Math.round(selectedLayer.rotation)}°</span>
                  </div>
                  <input type="range" min={-180} max={180} step={1} value={selectedLayer.rotation}
                    onChange={(e) => updateLayer(selectedLayer.id, { rotation: Number(e.target.value) })}
                    className="w-full accent-[#D4AF37]"
                  />
                  <div className="flex gap-1 mt-1">
                    {[0, 45, 90, -45, -90, 180].map((deg) => (
                      <button key={deg} onClick={() => updateLayer(selectedLayer.id, { rotation: deg })}
                        className="flex-1 py-0.5 bg-[#111] border border-[#333] text-gray-500 rounded text-[8px] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opacity */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <PropLabel>Opacity</PropLabel>
                    <span className="text-[#D4AF37] text-[9px]">{Math.round(selectedLayer.opacity * 100)}%</span>
                  </div>
                  <input type="range" min={0.05} max={1} step={0.05} value={selectedLayer.opacity}
                    onChange={(e) => updateLayer(selectedLayer.id, { opacity: Number(e.target.value) })}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>

                {/* Text-specific */}
                {selectedLayer.type === "text" && (
                  <>
                    <div>
                      <PropLabel>Text Content</PropLabel>
                      <textarea value={selectedLayer.text ?? ""} rows={2}
                        onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                        className="w-full px-2.5 py-2 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none focus:border-[#D4AF37]/50 resize-none"
                      />
                    </div>

                    <div>
                      <PropLabel>Font Family</PropLabel>
                      <select value={selectedLayer.fontFamily ?? "Inter"}
                        onChange={(e) => updateLayer(selectedLayer.id, { fontFamily: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none">
                        {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <PropLabel>Font Size</PropLabel>
                        <span className="text-[#D4AF37] text-[9px]">{selectedLayer.fontSize ?? 24}px</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateLayer(selectedLayer.id, { fontSize: Math.max(6, (selectedLayer.fontSize ?? 24) - 2) })}
                          className="w-6 h-6 bg-[#111] border border-[#333] rounded text-gray-400 flex items-center justify-center text-xs">−</button>
                        <input type="number" value={selectedLayer.fontSize ?? 24} min={6} max={200}
                          onChange={(e) => updateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })}
                          className="flex-1 px-2 py-1 bg-[#111] border border-[#333] rounded-lg text-white text-[10px] outline-none text-center" />
                        <button onClick={() => updateLayer(selectedLayer.id, { fontSize: Math.min(200, (selectedLayer.fontSize ?? 24) + 2) })}
                          className="w-6 h-6 bg-[#111] border border-[#333] rounded text-gray-400 flex items-center justify-center text-xs">+</button>
                      </div>
                    </div>

                    <div>
                      <PropLabel>Text Color</PropLabel>
                      <div className="flex items-center gap-2">
                        <input type="color" value={selectedLayer.fontColor ?? "#ffffff"}
                          onChange={(e) => updateLayer(selectedLayer.id, { fontColor: e.target.value })}
                          className="w-9 h-9 rounded-lg border border-[#333] cursor-pointer bg-[#111]"
                        />
                        <input type="text" value={selectedLayer.fontColor ?? "#ffffff"}
                          onChange={(e) => updateLayer(selectedLayer.id, { fontColor: e.target.value })}
                          className="flex-1 px-2 py-1.5 bg-[#111] border border-[#333] rounded-lg text-white text-[10px] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <PropLabel>Style</PropLabel>
                      <div className="flex gap-1">
                        {([
                          { key: "bold" as const, icon: Bold, tip: "Bold" },
                          { key: "italic" as const, icon: Italic, tip: "Italic" },
                          { key: "underline" as const, icon: Underline, tip: "Underline" },
                        ]).map(({ key, icon: Icon, tip }) => (
                          <button key={key} title={tip}
                            onClick={() => updateLayer(selectedLayer.id, { [key]: !selectedLayer[key] })}
                            className={`flex-1 p-1.5 rounded-lg border transition-all ${selectedLayer[key] ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]" : "border-[#333] text-gray-400 hover:text-gray-200"}`}>
                            <Icon size={13} className="mx-auto" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <PropLabel>Alignment</PropLabel>
                      <div className="flex gap-1">
                        {(["left", "center", "right"] as const).map((align) => {
                          const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight;
                          return (
                            <button key={align} onClick={() => updateLayer(selectedLayer.id, { align })}
                              className={`flex-1 p-1.5 rounded-lg border transition-all ${selectedLayer.align === align ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]" : "border-[#333] text-gray-400"}`}>
                              <Icon size={13} className="mx-auto" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <PropLabel>Letter Spacing</PropLabel>
                      <input type="number" value={selectedLayer.letterSpacing ?? 0} step={0.5} min={-5} max={20}
                        onChange={(e) => updateLayer(selectedLayer.id, { letterSpacing: Number(e.target.value) })}
                        className="w-full px-2.5 py-1.5 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={selectedLayer.textShadow ?? false}
                          onChange={(e) => updateLayer(selectedLayer.id, { textShadow: e.target.checked })}
                          className="accent-[#D4AF37]"
                        />
                        <span className="text-gray-400 text-[10px]">Shadow</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={selectedLayer.textOutline ?? false}
                          onChange={(e) => updateLayer(selectedLayer.id, { textOutline: e.target.checked })}
                          className="accent-[#D4AF37]"
                        />
                        <span className="text-gray-400 text-[10px]">Outline</span>
                      </label>
                    </div>
                  </>
                )}

                {/* Image-specific */}
                {selectedLayer.type === "image" && (
                  <div>
                    <PropLabel>Transform</PropLabel>
                    <div className="flex gap-1.5">
                      <button onClick={() => updateLayer(selectedLayer.id, { flipH: !selectedLayer.flipH })}
                        className={`flex-1 p-1.5 rounded-lg border text-xs flex items-center justify-center gap-1 transition-all ${selectedLayer.flipH ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]" : "border-[#333] text-gray-400"}`}>
                        <FlipHorizontal size={12} /> H
                      </button>
                      <button onClick={() => updateLayer(selectedLayer.id, { flipV: !selectedLayer.flipV })}
                        className={`flex-1 p-1.5 rounded-lg border text-xs flex items-center justify-center gap-1 transition-all ${selectedLayer.flipV ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]" : "border-[#333] text-gray-400"}`}>
                        <FlipHorizontal size={12} className="rotate-90" /> V
                      </button>
                    </div>
                  </div>
                )}

                {/* Layer order */}
                <div>
                  <PropLabel>Layer Order</PropLabel>
                  <div className="flex gap-1.5">
                    <button onClick={() => moveLayerOrder(selectedLayer.id, "up")}
                      className="flex-1 p-1.5 bg-[#111] border border-[#333] text-gray-400 rounded-lg hover:text-gray-200 hover:border-[#444] flex items-center justify-center gap-1 text-[10px]">
                      <MoveUp size={12} /> Up
                    </button>
                    <button onClick={() => moveLayerOrder(selectedLayer.id, "down")}
                      className="flex-1 p-1.5 bg-[#111] border border-[#333] text-gray-400 rounded-lg hover:text-gray-200 hover:border-[#444] flex items-center justify-center gap-1 text-[10px]">
                      <MoveDown size={12} /> Down
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-[#1a1a1a] pt-3 space-y-1.5">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => updateLayer(selectedLayer.id, { locked: !selectedLayer.locked })}
                      className="py-1.5 bg-[#111] border border-[#333] text-gray-400 rounded-lg text-[10px] flex items-center justify-center gap-1.5 hover:text-gray-200 transition-all">
                      {selectedLayer.locked ? <Unlock size={11} /> : <Lock size={11} />}
                      {selectedLayer.locked ? "Unlock" : "Lock"}
                    </button>
                    <button onClick={duplicateSelected}
                      className="py-1.5 bg-[#111] border border-[#333] text-gray-400 rounded-lg text-[10px] flex items-center justify-center gap-1.5 hover:text-gray-200 transition-all">
                      <Copy size={11} /> Duplicate
                    </button>
                  </div>
                  <button onClick={deleteSelected}
                    className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs hover:bg-red-500/20 flex items-center justify-center gap-2">
                    <Trash2 size={13} /> Delete Layer
                  </button>
                </div>

                {/* Export current side */}
                <div className="border-t border-[#1a1a1a] pt-3 space-y-1.5">
                  <PropLabel>Export This Side</PropLabel>
                  <button
                    onClick={async () => {
                      const data = await exportSideToPNG(activeView);
                      downloadFile(data, `${PRINT_AREAS[activeView].label}_${Date.now()}.jpg`);
                    }}
                    className="w-full py-2 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-[10px] hover:border-[#D4AF37]/50 flex items-center justify-center gap-2">
                    <Download size={12} /> Download PNG
                  </button>
                </div>
              </>
            )}

            {/* Product info */}
            <div className="border-t border-[#1a1a1a] pt-3">
              <PropLabel>Product</PropLabel>
              <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-3">
                <p className="text-white text-[10px] font-semibold line-clamp-2 mb-1">{product.name}</p>
                <p className="text-[#D4AF37] text-[10px] font-bold">{formatPKR(product.salePrice ?? product.price)}</p>
                <p className="text-gray-500 text-[9px]">{product.printingMethod}</p>
                <div className="flex gap-1 mt-1.5">
                  {product.colors.slice(0, 6).map((c) => (
                    <button key={c} onClick={() => setShirtColor(c)}
                      className={`w-4 h-4 rounded-full border transition-all ${shirtColor === c ? "border-[#D4AF37] scale-110" : "border-[#333]"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {savedDesign && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="bg-[#111] border border-[#D4AF37]/40 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-black" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Design Saved!</h3>
              <p className="text-gray-400 text-sm">Redirecting to cart...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PropLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 text-[9px] uppercase tracking-wider mb-1.5">{children}</p>;
}
