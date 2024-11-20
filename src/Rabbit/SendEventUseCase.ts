import amqplib from 'amqplib';

export async function produceMessage(cola: string, data: string) {
  try {
    // Conectar a RabbitMQ
    const connection = await amqplib.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    await channel.assertQueue(cola, { durable: true });

    // Mensaje que quieres enviar
    const message = data;
    channel.sendToQueue(cola, Buffer.from(message), { persistent: true });

    console.log(`Mensaje enviado: ${message}`);

    // Cerrar la conexión después de enviar el mensaje
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error en el productor:', error);
  }
}