import amqplib from 'amqplib';

export async function produceMessage(telefono: string) {
  try {
    // Conectar a RabbitMQ
    const connection = await amqplib.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    // Crear o asegurarse de que la cola existe
    const queue = 'crear_usuario';
    await channel.assertQueue(queue, { durable: true });

    // Mensaje que quieres enviar
    const message = telefono;
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

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