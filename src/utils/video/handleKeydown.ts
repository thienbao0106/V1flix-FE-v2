const keyMenu = (e: any, functions: any[]) => {
  return {
    " ": () => {
      e.preventDefault();
      functions[0]();
    },
    k: functions[0],

    f: functions[1],
    i: functions[2],
    t: functions[3],
    m: functions[4],
    c: functions[5],
    arrowleft: functions[6],
    arrowright: functions[6],
  };
};

export const handleKeydown = (e: any, functions: any[]) => {
  if (!document) return;
  const tagName = document?.activeElement?.tagName.toLowerCase();
  if (tagName === "input") return;
  const key = e.key.toLowerCase();
  console.log(key);
  const menu: any = keyMenu(e, functions);
  if (!menu[key]) return;
  if (key === "arrowleft") menu[key](-5);
  else if (key === "arrowright") menu[key](5);
  menu[key]();
};
