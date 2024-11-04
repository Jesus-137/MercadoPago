import amqplib from 'amqplib';

export async function consumeMessages(callback: (msg: string) => void): Promise<void> {
  try {
    const connection = await amqplib.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'crear_usuario';
    await channel.assertQueue(queue, { durable: true });

    console.log(`Esperando mensajes en la cola: ${queue}`);

    await channel.consume(queue, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        console.log(`Mensaje recibido: ${messageContent}`);
        callback(messageContent); // Envía el mensaje al callback
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error en el consumidor:', error);
  }
}
