"use strict";
self.onmessage = function ({ data: { type, option, id } }) {
    const map = {};
    switch (type) {
        case 0 /* NEW */:
            const interval = typeof option === "number" ? option : option?.interval || 1000;
            map[id] = self.setInterval(self.postMessage, interval, 4 /* UPDATE */);
            break;
        case 3 /* STOP */:
            break;
        case 1 /* RUN */:
            break;
        case 5 /* CLEAR */:
            break;
    }
};
