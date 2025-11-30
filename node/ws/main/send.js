export const send = (ws, message) => {
    ws.send(JSON.stringify(message));
};
