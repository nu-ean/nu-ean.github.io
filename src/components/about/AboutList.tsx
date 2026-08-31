import { useLayoutEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";

import styles from "./About.module.css";
import AboutCard, { type AboutItem } from "./AboutCard";
import About from "./contents/About";
import Skills from "./contents/Skills";
import Journey from "./contents/Journey";
import Icon from "../common/Icon";

// 스크롤 애니메이션 설정값
const itemDistance = "1rem"; // 각 카드 사이의 기본 세로 간격. 카드들이 화면에 나란히 쌓일 때 간격을 조절
const itemScale = 0.05; // 카드마다 축소되는 비율. 인덱스가 증가할수록 scale이 itemScale만큼 줄어듦
const itemStackDistance = 30; // 카드가 스택으로 들어갈 때 위아래로 얼마나 겹쳐지며 쌓일지(px)
const stackPosition = "3%"; // 카드가 스케일링/핀ning 되기 시작하는 기준 위치(컨테이너 높이 대비 비율)
const scaleEndPosition = "10%"; // 스케일 변화가 끝나는 위치(컨테이너 높이 대비 비율). 여기까지 내려오면 카드 크기 고정
const baseScale = 0.9; // 카드의 기본 축소 비율. 스택의 최하단 카드가 갖는 scale 값의 시작점
const rotationAmount = 0; // 카드마다 회전하는 정도. i번째 카드가 쌓일 때 얼마나 기울어질지(deg 단위)
const blurAmount = 2; // 카드가 스택에 눌려 들어갈 때 뒤쪽 카드에 주어지는 블러 효과 강도(px 단위)

const items: AboutItem[] = [
  {
    id: "about",
    sectionLabel: "About",
    headline: "NAEUN LEE",
    tagline: "웹 개발자",
    content: <About />,
    image: "typing.gif",
  },
  {
    id: "skills",
    sectionLabel: "Skills",
    headline: "Learning, Refactoring, and Improving",
    tagline: "끊임없이 배우고, 더 나은 코드를 고민합니다",
    content: <Skills />,
    image: "typing-hands.gif",
  },
  {
    id: "journey",
    sectionLabel: "Journey",
    headline: "From Curiosity to Creation",
    tagline: "경험을 통해 꾸준히 성장하고자 합니다",
    content: <Journey />,
    image: "journey.gif",
  },
];

export default function AboutList() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(value as string);
    },
    []
  );

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );
    const endElement = scroller.querySelector(
      "[data-stack-end]"
    ) as HTMLElement | null;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const contentEl = scroller.querySelector(
      "[data-stack-inner]"
    ) as HTMLElement | null;
    if (!contentEl) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: contentEl,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    // 스크롤 힌트 제어 (스크롤 다운 유도)
    lenis.on("scroll", ({ scroll }) => {
      setScrolled(scroll > 50);
    });

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll("[data-stack-card]")
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = itemDistance;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
    });

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <>
      {!scrolled && (
        <div className={styles.scrollHint}>
          <Icon id="scroll" className={styles.scrollIcon} />
        </div>
      )}
      <div className={styles.scroller} ref={scrollerRef}>
        <div className={styles.inner} data-stack-inner>
          {items.map((item: AboutItem) => (
            <AboutCard key={item.id} item={item} />
          ))}
          <div className={styles.end} data-stack-end />
        </div>
      </div>
    </>
  );
}
