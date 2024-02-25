import { WebSocketServer, createWebSocketStream } from 'ws';
//import { movement } from '../methods/navigation';
//import { drawing } from '../methods/drawing';
//import { printing } from '../methods/screen';
//import { mouse } from '@nut-tree/nut-js';

const port = 8080

export const wss = new WebSocketServer({ port });

console.log(`Start WebSocket server http://localhost:${port} on the port ${port}!`);

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('open', () => {
    console.log('connected');
  });

  duplex.on('data', async (chunk: object) => {
    console.log(`received: ${chunk}`);
    const [command, distance, height] = chunk.toString().split(' ');

    switch (command.split('_')[0]) {
      case 'mouse':
        if (command === 'mouse_position') {
          //duplex.write(`${command}_(${(await mouse.getPosition()).x.toString()},${(await mouse.getPosition()).y.toString()})`);
        }
        else {
          //movement(command, Number(distance));
          duplex.write(`${command}_${distance}`);
        }
        break;
      case 'draw':
        if (chunk.toString().split(' ').length === 3) {
          //drawing(command, Number(distance), Number(height));
          duplex.write(`${command}_${distance}_${height}`);
        } else {
          //drawing(command, Number(distance), Number(distance));
          duplex.write(`${command}_${distance}`);
        }
        break;
      case 'prnt':
        //printing();
        //duplex.write(`${command} ${(await printing()).split(',')[1]}`);
        break;
    }
  });

  duplex.on('error', (err) => {
    console.log(err);
  })

  duplex.on('close', () => {
    console.log('disconnected');
  });
});