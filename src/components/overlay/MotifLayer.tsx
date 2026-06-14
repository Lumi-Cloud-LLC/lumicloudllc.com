import { useEffect, useRef, useState, useMemo } from "react";
import { useConfigStore } from "../../store/config";
import { MOTIF_SVGS } from "../../lib/motif-svgs";

const KF = ["drift1", "drift2", "drift3"];

interface MotifItem {
  fr: number;
  lane: number;
  x: string;
  oprand: number;
  depthValue: number;
  scale: number;
  driftAnim: string;
  motifType: number;
}

export default function MotifLayer() {
  const count = useConfigStore((s) => s.config.motifs.count);
  const opMin = useConfigStore((s) => s.config.motifs.opMin);
  const opMax = useConfigStore((s) => s.config.motifs.opMax);

  const [scrollHeight, setScrollHeight] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const effectiveCount = useMemo(() => {
    if (typeof window === "undefined") return count;
    return window.innerWidth < 720 ? Math.min(8, count) : count;
  }, [count]);

  // Generate motif items - keyed on effectiveCount
  const items: MotifItem[] = useMemo(() => {
    const result: MotifItem[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      const fr = (i + 0.5) / effectiveCount + (Math.random() * 0.05 - 0.025);
      const lane = i % 3;
      let x: string;
      if (lane === 0) {
        x = `left:${(2 + Math.random() * 9).toFixed(1)}%`;
      } else if (lane === 1) {
        x = `right:${(20 + Math.random() * 8).toFixed(1)}%`;
      } else {
        x = `left:${(34 + Math.random() * 16).toFixed(1)}%`;
      }
      const oprand = Math.random();
      const depthValue = 12 + Math.random() * 26;
      const scale = 0.7 + Math.random() * 0.7;
      const driftAnim = reduce
        ? ""
        : `${KF[i % 3]} ${(24 + Math.random() * 18).toFixed(0)}s ease-in-out infinite${i % 2 ? " reverse" : ""}`;

      result.push({
        fr,
        lane,
        x,
        oprand,
        depthValue,
        scale,
        driftAnim,
        motifType: i % MOTIF_SVGS.length,
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveCount]);

  // Measure scroll height after mount and on resize
  useEffect(() => {
    const measure = () => {
      setScrollHeight(document.documentElement.scrollHeight);
    };
    measure();
    window.addEventListener("load", measure);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Parallax RAF loop
  useEffect(() => {
    let cx = 0,
      cy = 0;
    let tx = 0,
      ty = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    function tick() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const dm = useConfigStore.getState().config.motifs.depth;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const dp = (items[i]?.depthValue ?? 20) * dm;
        el.style.transform = `translate(${-cx * dp}px,${-cy * dp}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  // Compute opacity from opMin/opMax
  function getOpacity(item: MotifItem): number {
    let o = opMin + item.oprand * (opMax - opMin);
    if (item.lane === 2) o *= 0.45;
    return o;
  }

  // Compute top position from scrollHeight
  function getTop(item: MotifItem): string {
    if (scrollHeight === 0) return "50%";
    return (item.fr * (scrollHeight - 240) + 90).toFixed(0) + "px";
  }

  // Parse the x position string into style object
  function getXStyle(x: string): React.CSSProperties {
    const [prop, val] = x.split(":");
    return { [prop.trim()]: val.trim() };
  }

  return (
    <div
      ref={containerRef}
      id="floaters"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: scrollHeight > 0 ? `${scrollHeight}px` : "100%",
        zIndex: 1,
        pointerEvents: "none",
        overflow: "clip",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="floater"
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            top: getTop(item),
            opacity: getOpacity(item),
            willChange: "transform",
            ...getXStyle(item.x),
          }}
        >
          <div
            className="drift"
            style={{
              willChange: "transform",
              animation: item.driftAnim || undefined,
            }}
          >
            <div
              style={{ transform: `scale(${item.scale.toFixed(2)})` }}
              dangerouslySetInnerHTML={{ __html: MOTIF_SVGS[item.motifType] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
