interface Collback {
  (...arge: any[]): void;
}

interface Events {
  type: "once" | "on";
  event: Collback;
}

type EventArray = Record<string, Events[] | undefined>;
type EventObject = Record<string, Events | undefined>;

const ce = (type: Events["type"], event: Events["event"]): Events => {
  return { type, event };
};

const on = (
  ea: EventArray,
  name: string,
  type: Events["type"],
  cb: Events["event"]
) => {
  !ea[name] && (ea[name] = []);
  ea[name]?.push({ type: type, event: cb });
};

export const createEvents = () => {
  const ea: EventArray = {};
  const eo: EventObject = {};

  return {
    setce: (name: string, cb: Events["event"]) => {
      eo[name] = ce("once", cb);
    },
    set: (name: string, cb: Events["event"]) => {
      eo[name] = ce("on", cb);
    },
    once: (name: string, cb: Events["event"]) => {
      on(ea, name, "once", cb);
    },
    on: (name: string, cb: Events["event"]) => {
      on(ea, name, "on", cb);
    },
    off: (name: string, cb?: Events["event"]) => {
      if (ea[name] && cb) {
        for (let i = 0; i < ea[name]!.length; i++) {
          if (ea[name]![i].event === cb) ea[name]!.splice(i, 1), i--;
        }
      }
      ea[name] && !cb && delete ea[name];
      eo[name] && delete eo[name];
    },
    emit: (name: string, ...cb: any[]) => {
      eo[name]?.event(...cb);
      eo[name]?.type === "once" && delete eo[name];
      if (ea[name]) {
        for (let i = 0; i < ea[name]!.length; i++) {
          ea[name]![i].event(...cb);
          ea[name]![i].type === "once" && (ea[name]!.splice(i, 1), i--);
        }
      }
      console.log(JSON.stringify(eo), JSON.stringify(ea));
    },
  };
};
