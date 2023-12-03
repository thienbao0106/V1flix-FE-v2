export function setSubtitle(settingBoxRef: HTMLDivElement | undefined) {
  if (!settingBoxRef) return;
  settingBoxRef.classList.add("hidden");
}

export function handleCue(cues: any, check?: boolean) {
  if (!cues) return;
  for (let i = 0; i < cues.length; i++) {
    const cue: any = cues[i];
    if (check) cue.line = check ? -3 : -2;
    cue.line = -3;
  }
}
