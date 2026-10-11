"use client";

import { useEffect, useState } from "react";

const headline = "Every payment should have a clear record.";
const prefix = "Every payment should have ";
const phrases = [
  "a clear record.",
  "a traceable outcome.",
  "an explainable match.",
  "reviewable evidence.",
];

export function HeroHeadline() {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const clearTimer = () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };

    const typePhrase = () => {
      const phrase = phrases[phraseIndex];

      if (deleting) {
        characterIndex -= 1;
        setVisibleText(phrase.slice(0, characterIndex));
        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = window.setTimeout(typePhrase, 350);
          return;
        }
        timer = window.setTimeout(typePhrase, 28);
        return;
      }

      characterIndex += 1;
      setVisibleText(phrase.slice(0, characterIndex));
      if (characterIndex === phrase.length) {
        deleting = true;
        timer = window.setTimeout(typePhrase, 1500);
        return;
      }
      timer = window.setTimeout(typePhrase, 55);
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      clearTimer();
      phraseIndex = 0;
      characterIndex = 0;
      deleting = false;
      if (event.matches) {
        setVisibleText(phrases[0]);
        return;
      }
      setVisibleText("");
      timer = window.setTimeout(typePhrase, 240);
    };

    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    if (motionPreference.matches) {
      setVisibleText(phrases[0]);
    } else {
      timer = window.setTimeout(typePhrase, 240);
    }

    return () => {
      clearTimer();
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <h1 aria-label={headline} className="pg-enterprise-headline">
      <span aria-hidden="true" className="pg-enterprise-headline-reserve">
        {prefix}<em>a traceable outcome.</em>
      </span>
      <span aria-hidden="true" className="pg-enterprise-headline-typed">
        {prefix}<em>{visibleText}</em>
        <span className="pg-enterprise-type-caret" />
      </span>
    </h1>
  );
}
